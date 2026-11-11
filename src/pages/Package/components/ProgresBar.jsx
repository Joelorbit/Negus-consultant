import { CheckCircle } from "lucide-react";
import React from "react";

const ProgresBar = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center relative">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div
            key={step.id}
            className="flex flex-col items-center z-10 relative"
          >
            <div
              className={`
                w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform
                ${
                  isCompleted
                    ? "bg-gradient-to-tr from-orange-600 to-orange-700 text-white shadow-lg scale-110 animate-pulse"
                    : isCurrent
                    ? "bg-gradient-to-tr from-orange-800 to-orange-900 text-orange-400 shadow-lg scale-110 animate-pulse"
                    : "bg-black/50 border-2 border-orange-700 text-orange-600 shadow-sm"
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle size={24} className="animate-bounce text-white" />
              ) : (
                <StepIcon size={24} />
              )}
            </div>
            <p
              className={`text-sm text-center mt-3 font-medium transition-colors duration-300 ${
                isCompleted || isCurrent
                  ? "text-orange-400 drop-shadow-md"
                  : "text-orange-600"
              }`}
            >
              {step.title}
            </p>
          </div>
        );
      })}

      {/* Progress Line */}
      <div className="absolute top-8 left-8 right-8 h-1 bg-black/20 rounded-full -z-10 border border-orange-700/40">
        <div
          className="h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgresBar;
