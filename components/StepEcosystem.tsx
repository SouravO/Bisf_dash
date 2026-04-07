import React from 'react';
import { StepProps } from '../types';

export default function StepEcosystem({ formData, updateData }: StepProps) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Are you interested in joining our ecosystem?
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button
          onClick={() => updateData({ ecosystem: true })}
          className={`px-8 py-6 rounded-xl border-2 transition-all duration-300 flex-1 text-lg font-medium shadow-sm hover:shadow-md
            ${
              formData.ecosystem === true
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-300 text-gray-700 hover:bg-gray-50'
            }`}
        >
          Yes
        </button>
        <button
          onClick={() => updateData({ ecosystem: false })}
          className={`px-8 py-6 rounded-xl border-2 transition-all duration-300 flex-1 text-lg font-medium shadow-sm hover:shadow-md
            ${
              formData.ecosystem === false
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-300 text-gray-700 hover:bg-gray-50'
            }`}
        >
          No
        </button>
      </div>
    </div>
  );
}