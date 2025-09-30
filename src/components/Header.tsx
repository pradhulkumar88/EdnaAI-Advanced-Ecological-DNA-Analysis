import React from 'react';
import { Dna, Microscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-blue-600">
              <Dna className="h-8 w-8" />
              <Microscope className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EdnaAI</h1>
              <p className="text-sm text-gray-600">Advanced Ecological DNA Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <span>v2.1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};