import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  jobTitle: string;
  jobDescription: string;
  matchedSkills: string[];
  missingSkills: string[];
  resumeSummary?: string;
  strengths?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: RequestBody = await req.json();
    const {
      jobTitle,
      jobDescription,
      matchedSkills,
      missingSkills,
      resumeSummary,
      strengths,
    } = body;

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");

    let recommendations: string[] = [];

    if (openaiApiKey) {
      recommendations = await generateWithOpenAI(
        openaiApiKey,
        jobTitle,
        jobDescription,
        matchedSkills,
        missingSkills,
        resumeSummary,
        strengths
      );
    } else if (anthropicApiKey) {
      recommendations = await generateWithAnthropic(
        anthropicApiKey,
        jobTitle,
        jobDescription,
        matchedSkills,
        missingSkills,
        resumeSummary,
        strengths
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "No AI API key configured",
          recommendations: [],
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ recommendations }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        recommendations: [],
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

async function generateWithOpenAI(
  apiKey: string,
  jobTitle: string,
  jobDescription: string,
  matchedSkills: string[],
  missingSkills: string[],
  resumeSummary?: string,
  strengths?: string
): Promise<string[]> {
  const prompt = buildPrompt(
    jobTitle,
    jobDescription,
    matchedSkills,
    missingSkills,
    resumeSummary,
    strengths
  );

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a career advisor for university students. Provide practical, actionable recommendations.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  return parseRecommendations(content);
}

async function generateWithAnthropic(
  apiKey: string,
  jobTitle: string,
  jobDescription: string,
  matchedSkills: string[],
  missingSkills: string[],
  resumeSummary?: string,
  strengths?: string
): Promise<string[]> {
  const prompt = buildPrompt(
    jobTitle,
    jobDescription,
    matchedSkills,
    missingSkills,
    resumeSummary,
    strengths
  );

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const content = data.content?.[0]?.text || "";

  return parseRecommendations(content);
}

function buildPrompt(
  jobTitle: string,
  jobDescription: string,
  matchedSkills: string[],
  missingSkills: string[],
  resumeSummary?: string,
  strengths?: string
): string {
  return `As a career advisor, provide 4-5 specific, actionable recommendations for a student targeting a ${jobTitle} role.

Job Description: ${jobDescription}

Student Profile:
- Skills they have: ${matchedSkills.join(", ") || "None"}
- Skills they're missing: ${missingSkills.join(", ")}
${resumeSummary ? `- Background: ${resumeSummary}` : ""}
${strengths ? `- Strengths: ${strengths}` : ""}

Provide practical next steps that are:
1. Specific and actionable
2. Focused on the missing skills
3. Include learning resources, project ideas, or certifications
4. Realistic for a student to accomplish

Format your response as a numbered list of 4-5 recommendations. Each recommendation should be one clear sentence.`;
}

function parseRecommendations(content: string): string[] {
  const lines = content.split("\n").filter((line) => line.trim());

  const recommendations = lines
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 20 && !line.startsWith("#"));

  return recommendations.slice(0, 5);
}
