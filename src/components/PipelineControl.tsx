import React, { useState } from 'react';
import { Settings, Play, Info, Cpu, BarChart3, Brain } from 'lucide-react';
import { AnalysisData } from '../types';

interface PipelineControlProps {
  data: AnalysisData;
  onStartAnalysis: () => void;
}

export const PipelineControl: React.FC<PipelineControlProps> = ({ data, onStartAnalysis }) => {
  const [selectedSteps, setSelectedSteps] = useState({
    embeddings: true,
    clustering: true,
    classification: true,
    regression: true
  });

  const steps = [
    {
      id: 'embeddings',
      title: 'Generate Ecological Embeddings',
      description: 'Create taxonomy-free representations using autoencoder neural networks',
      icon: Brain,
      color: 'blue',
      estimatedTime: '45s'
    },
    {
      id: 'clustering',
      title: 'Ecological Clustering',
      description: 'Identify distinct ecological communities and patterns',
      icon: BarChart3,
      color: 'green',
      estimatedTime: '30s'
    },
    {
      id: 'classification',
      title: 'Status Classification',
      description: 'Train models to classify ecological health status (Poor/Fair/Good)',
      icon: Settings,
      color: 'purple',
      estimatedTime: '60s'
    },
    {
      id: 'regression',
      title: 'Biodiversity Regression',
      description: 'Predict biodiversity indices and environmental metrics',
      icon: Cpu,
      color: 'orange',
      estimatedTime: '50s'
    }
  ];

  const toggleStep = (stepId: string) => {
    setSelectedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const selectedCount = Object.values(selectedSteps).filter(Boolean).length;
  const totalTime = steps
    .filter(step => selectedSteps[step.id as keyof typeof selectedSteps])
    .reduce((acc, step) => acc + parseInt(step.estimatedTime), 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Configure Analysis Pipeline</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Select the analysis steps you want to run on your {data.isSimulated ? 'synthetic' : 'uploaded'} dataset. 
          Each step builds upon the previous ones to provide comprehensive ecological insights.
        </p>
      </div>

      {/* Dataset Summary */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{data.samples}</p>
            <p className="text-sm text-gray-600">Samples</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{data.features}</p>
            <p className="text-sm text-gray-600">Features</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{data.filename}</p>
            <p className="text-sm text-gray-600">Dataset</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{data.isSimulated ? 'Demo' : 'Real'}</p>
            <p className="text-sm text-gray-600">Data Type</p>
          </div>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="max-w-4xl mx-auto grid gap-4">
        {steps.map((step) => {
          const isSelected = selectedSteps[step.id as keyof typeof selectedSteps];
          const Icon = step.icon;
          
          return (
            <div
              key={step.id}
              className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${
                isSelected 
                  ? `border-${step.color}-200 bg-${step.color}-50` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleStep(step.id)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? `bg-${step.color}-100` : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? `text-${step.color}-600` : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">~{step.estimatedTime}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? `border-${step.color}-500 bg-${step.color}-500` 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analysis Summary & Start */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Ready to analyze {data.samples} samples
            </p>
            <p className="text-gray-600">
              {selectedCount} steps selected • Estimated time: ~{Math.ceil(totalTime / 60)} minutes
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Info className="h-4 w-4" />
              <span>Results will include UMAP plots, metrics, and feature importance</span>
            </div>
            <button
              onClick={onStartAnalysis}
              disabled={selectedCount === 0}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};