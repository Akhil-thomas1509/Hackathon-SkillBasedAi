import { Check } from 'lucide-react';
import { Page } from '../types';

interface Step {
  id: Page;
  name: string;
  order: number;
}

const STEPS: Step[] = [
  { id: 'jobs', name: 'Select Role', order: 1 },
  { id: 'profile', name: 'Build Profile', order: 2 },
  { id: 'loading', name: 'Analyzing', order: 3 },
  { id: 'results', name: 'Results', order: 4 },
];

interface StepIndicatorProps {
  currentPage: Page;
}

export function StepIndicator({ currentPage }: StepIndicatorProps) {
  if (currentPage === 'landing') {
    return null;
  }

  const currentStep = STEPS.find((step) => step.id === currentPage);
  const currentOrder = currentStep?.order || 0;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = step.order < currentOrder;
          const isCurrent = step.id === currentPage;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30'
                      : isCurrent
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 scale-110'
                      : 'bg-slate-800 border-2 border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-bold ${
                        isCurrent ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.order}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:block ${
                    isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative -mt-7 hidden sm:block">
                  <div className="absolute inset-0 bg-slate-700"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500 ${
                      isCompleted ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
