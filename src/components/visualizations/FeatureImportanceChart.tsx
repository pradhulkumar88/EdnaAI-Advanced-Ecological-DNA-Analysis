import React from 'react';
import { FeatureImportance } from '../../types';

interface FeatureImportanceChartProps {
  features: FeatureImportance[];
}

export const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ features }) => {
  const maxImportance = Math.max(...features.map(f => f.importance));

  const getCategoryColor = (category: string) => {
    return category === 'Environmental' ? '#3B82F6' : '#10B981';
  };

  return (
    <div className="space-y-4">
      {features.map((feature, index) => {
        const barWidth = (feature.importance / maxImportance) * 100;
        const color = getCategoryColor(feature.category);
        
        return (
          <div key={feature.feature} className="flex items-center space-x-4">
            <div className="w-4 text-sm text-gray-500 font-mono">
              {index + 1}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {feature.feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    feature.category === 'Environmental' 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {feature.category}
                  </span>
                </div>
                <span className="text-sm font-mono text-gray-600">
                  {feature.importance.toFixed(3)}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${barWidth}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 0 1px ${color}20`
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Environmental Variables</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Biological Variables</span>
        </div>
      </div>
    </div>
  );
};