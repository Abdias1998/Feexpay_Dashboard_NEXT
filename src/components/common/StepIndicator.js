'use client'

import { CheckCircle2 } from 'lucide-react'

export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index < currentStep
                ? 'bg-[#F26C1C] text-white'
                : index === currentStep
                ? 'bg-[#F26C1C] text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-0.5 ${
                index < currentStep ? 'bg-[#F26C1C]' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
