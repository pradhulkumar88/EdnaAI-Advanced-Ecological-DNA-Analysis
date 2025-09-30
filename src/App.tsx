import React, { useState } from 'react';
import { Header } from './components/Header';
import { DataUpload } from './components/DataUpload';
import { PipelineControl } from './components/PipelineControl';
import { ResultsVisualization } from './components/ResultsVisualization';
import { ModelManagement } from './components/ModelManagement';
import { AnalysisData, PipelineStep, ModelResults } from './types';

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [currentStep, setCurrentStep] = useState<PipelineStep>('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ModelResults | null>(null);
  const [savedModels, setSavedModels] = useState<string[]>([]);

  const handleDataUpload = (data: AnalysisData) => {
    setAnalysisData(data);
    setCurrentStep('pipeline');
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setCurrentStep('analysis');
    
    // Simulate analysis pipeline
    setTimeout(() => {
      const mockResults: ModelResults = {
        umapData: generateMockUmapData(),
        clusterData: generateMockClusterData(),
        performanceMetrics: {
          classificationAccuracy: 0.847,
          regressionMSE: 0.123,
          rSquared: 0.756
        },
        featureImportance: generateMockFeatureImportance()
      };
      setResults(mockResults);
      setIsAnalyzing(false);
      setCurrentStep('results');
    }, 3000);
  };

  const generateMockUmapData = () => {
    const data = [];
    const statuses = ['Poor', 'Fair', 'Good'];
    const colors = ['#EF4444', '#F59E0B', '#10B981'];
    
    for (let i = 0; i < 150; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const statusIndex = statuses.indexOf(status);
      data.push({
        x: Math.random() * 10 - 5 + statusIndex * 3,
        y: Math.random() * 10 - 5 + statusIndex * 2,
        status,
        color: colors[statusIndex],
        cluster: Math.floor(Math.random() * 5) + 1
      });
    }
    return data;
  };

  const generateMockClusterData = () => {
    return [
      { cluster: 1, size: 45, dominantSpecies: 'Bacillus sp.', diversity: 3.2 },
      { cluster: 2, size: 38, dominantSpecies: 'Pseudomonas sp.', diversity: 2.8 },
      { cluster: 3, size: 29, dominantSpecies: 'Streptomyces sp.', diversity: 4.1 },
      { cluster: 4, size: 22, dominantSpecies: 'Rhizobium sp.', diversity: 2.5 },
      { cluster: 5, size: 16, dominantSpecies: 'Azotobacter sp.', diversity: 3.7 }
    ];
  };

  const generateMockFeatureImportance = () => {
    const features = [
      'pH_level', 'dissolved_oxygen', 'temperature', 'turbidity', 'nitrate_concentration',
      'phosphate_level', 'bacterial_diversity', 'fungal_abundance', 'total_carbon'
    ];
    
    return features.map(feature => ({
      feature,
      importance: Math.random() * 0.8 + 0.2,
      category: feature.includes('_') ? 'Environmental' : 'Biological'
    })).sort((a, b) => b.importance - a.importance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-sm">
              {(['upload', 'pipeline', 'analysis', 'results'] as PipelineStep[]).map((step, index) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center space-x-2 ${
                    currentStep === step ? 'text-blue-600' : 
                    ['upload', 'pipeline', 'analysis', 'results'].indexOf(currentStep) > index ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step ? 'bg-blue-100 text-blue-600' :
                      ['upload', 'pipeline', 'analysis', 'results'].indexOf(currentStep) > index ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium capitalize">{step}</span>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-px ${
                      ['upload', 'pipeline', 'analysis', 'results'].indexOf(currentStep) > index ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content */}
          {currentStep === 'upload' && (
            <DataUpload onDataUpload={handleDataUpload} />
          )}

          {currentStep === 'pipeline' && analysisData && (
            <PipelineControl 
              data={analysisData} 
              onStartAnalysis={handleAnalysisStart}
            />
          )}

          {currentStep === 'analysis' && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3 bg-white rounded-lg px-6 py-4 shadow-sm">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-lg font-medium text-gray-700">Running analysis pipeline...</span>
              </div>
            </div>
          )}

          {currentStep === 'results' && results && (
            <ResultsVisualization results={results} />
          )}

          {/* Model Management - Always visible at bottom */}
          <ModelManagement 
            savedModels={savedModels}
            setSavedModels={setSavedModels}
            hasResults={!!results}
          />
        </div>
      </main>
    </div>
  );
}

export default App;