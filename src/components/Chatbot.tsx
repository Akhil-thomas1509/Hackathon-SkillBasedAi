import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './Button';

interface Message {
  text: string;
  isUser: boolean;
}

const QUICK_QUESTIONS = [
  'What does this app do?',
  'How do I upload my resume?',
  'How is my score calculated?',
  'What should I do next?',
];

export function Chatbot() {
  const { currentPage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hi! I\'m your SkillBridge AI assistant. How can I help you today?',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  function handleSend(text?: string) {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { text: messageText, isUser: true }]);
    setInput('');

    setTimeout(() => {
      const response = generateResponse(messageText.toLowerCase());
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 500);
  }

  function generateResponse(query: string): string {
    if (query.includes('what') && (query.includes('app') || query.includes('website') || query.includes('does'))) {
      return 'SkillBridge AI helps students understand how close they are to their dream tech roles. You can select a target job, input your skills or upload your resume, and receive a personalized match score with AI-powered recommendations on what to learn next.';
    }

    if (query.includes('resume') || query.includes('upload')) {
      if (currentPage === 'profile') {
        return 'You\'re on the profile page! Scroll down to find the resume upload section. You can either upload a file or paste your resume text directly. Click "Extract Skills" to automatically detect your skills from your resume.';
      }
      return 'To upload your resume, first select a target role from the job board, then on the profile page you\'ll find a resume upload section where you can upload a file or paste your resume text.';
    }

    if (query.includes('score') || query.includes('calculated') || query.includes('match')) {
      return 'Your match score is calculated by comparing your skills (both manually selected and extracted from your resume) against the required skills for your target role. The percentage shows how many of the required skills you currently possess.';
    }

    if (query.includes('start') || query.includes('begin') || query.includes('how to')) {
      if (currentPage === 'landing') {
        return 'Click the "Start Analysis" button on this page to begin! You\'ll first choose a target tech role, then input your skills or upload your resume.';
      }
      return 'Navigate to the home page and click "Start Analysis" to begin your career analysis journey.';
    }

    if (query.includes('next') || query.includes('after') || query.includes('results')) {
      if (currentPage === 'results') {
        return 'Great question! You can compare yourself against another role, update your skills, or use the recommendations we provided to start learning. Focus on the missing skills that would have the biggest impact on your match score.';
      }
      return 'After receiving your results, you\'ll see your match score, the skills you have vs. skills you need, and personalized recommendations on what to learn or build next.';
    }

    if (query.includes('recommend') || query.includes('suggestion') || query.includes('advice')) {
      return 'Our recommendations are tailored to your specific skill gaps. We suggest courses to take, projects to build, and practical steps to improve your readiness for your target role. Focus on one or two high-priority skills at a time for the best results.';
    }

    if (query.includes('ai') || query.includes('intelligent') || query.includes('smart')) {
      return 'We use AI to generate personalized career recommendations based on your profile and target role. We also have deterministic skill extraction from resumes and fallback recommendation systems to ensure the app works reliably even without AI API access.';
    }

    if (query.includes('role') || query.includes('job') || query.includes('position')) {
      if (currentPage === 'jobs') {
        return 'You\'re on the job board! Browse the available tech roles and click "Select Role" on the one that interests you most. We currently have positions in software engineering, data science, cybersecurity, cloud engineering, and more.';
      }
      return 'We have curated tech roles including Software Engineer, Data Scientist, Cybersecurity Analyst, Frontend Developer, Cloud Engineer, and AI/ML Engineer. Each role has specific skill requirements we\'ll help you match against.';
    }

    if (query.includes('help') || query.includes('support') || query.includes('confused')) {
      return 'I\'m here to help! You can ask me about how the app works, how to upload your resume, how the score is calculated, or what to do next. Try clicking one of the suggested questions below!';
    }

    if (query.includes('thank') || query.includes('thanks')) {
      return 'You\'re welcome! Feel free to ask if you have any other questions. Good luck with your career journey! 🚀';
    }

    return 'I\'m not sure I understand that question. Try asking about what the app does, how to upload your resume, how your score is calculated, or what you should do next. You can also click the suggested questions!';
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-200 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">SkillBridge Assistant</h3>
                <p className="text-xs text-cyan-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 text-center mb-3">Quick questions:</p>
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="w-full text-left px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="!px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
