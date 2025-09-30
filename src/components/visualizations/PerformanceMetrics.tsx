import React from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';
import { PerformanceMetrics as MetricsType } from '../../types';

interface PerformanceMetricsProps {
  metrics: MetricsType;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const metricCards = [
    {
      title: 'Classification Accuracy',
      value: (metrics.classificationAccuracy * 100).toFixed(1) + '%',
      icon: Target,
      description: 'Accuracy in predicting ecological status (Poor/Fair/Good)',
      score: metrics.classificationAccuracy
    },
    {
      title: 'Regression R²',
      value: metrics.rSquared.toFixed(3),
      icon: TrendingUp,
      description: 'Coefficient of determination for biodiversity prediction',
      score: metrics.rSquared
    },
    {
      title: 'Regression MSE',
      value: metrics.regressionMSE.toFixed(3),
      icon: Award,
      description: 'Mean squared error (lower is better)',
      score: 1 - metrics.regressionMSE, // Invert for color coding
      isInverted: true
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {metricCards.map((metric) => {
        const Icon = metric.icon;
        const colorClass = getScoreColor(metric.score);
        
        return (
          <div key={metric.title} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                  {metric.score >= 0.8 ? 'Excellent' : metric.score >= 0.6 ? 'Good' : 'Fair'}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.title}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <p className="text-sm text-gray-600">{metric.description}</p>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.score >= 0.8 ? 'bg-green-500' :
                      metric.score >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(metric.isInverted ? (1 - metrics.regressionMSE) : metric.score) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};