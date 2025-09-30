import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Download, Info, Eye } from 'lucide-react';
import { ModelResults } from '../types';
import { UmapPlot } from './visualizations/UmapPlot';
import { PerformanceMetrics } from './visualizations/PerformanceMetrics';
import { FeatureImportanceChart } from './visualizations/FeatureImportanceChart';
import { ClusterTable } from './visualizations/ClusterTable';

interface ResultsVisualizationProps {
  results: ModelResults;
}

export const ResultsVisualization: React.FC<ResultsVisualizationProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clusters' | 'features'>('overview');

  const tabs = [
    { id: 'overview', label: 'Analysis Overview', icon: Eye },
    { id: 'clusters', label: 'Ecological Clusters', icon: BarChart3 },
    { id: 'features', label: 'Feature Importance', icon: TrendingUp }
  ];

  const downloadResults = () => {
    const data = {
      performanceMetrics: results.performanceMetrics,
      clusterData: results.clusterData,
      featureImportance: results.featureImportance,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ednai_results_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h2>
          <p className="text-gray-600">
            Comprehensive ecological analysis with {results.umapData.length} samples processed
          </p>
        </div>
        <button
          onClick={downloadResults}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Results</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* UMAP Visualization */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">UMAP Projection</h3>
                  <p className="text-gray-600">2D visualization of ecological embeddings colored by status</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Poor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Fair</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Good</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <UmapPlot data={results.umapData} />
            </div>
          </div>

          {/* Performance Metrics */}
          <PerformanceMetrics metrics={results.performanceMetrics} />
        </div>
      )}

      {activeTab === 'clusters' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Ecological Clusters</h3>
              <p className="text-gray-600">Identified microbial communities and their characteristics</p>
            </div>
            <ClusterTable clusters={results.clusterData} />
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-gray-900">Feature Importance</h3>
                <Info className="h-5 w-5 text-gray-400" title="Features ranked by their contribution to model predictions" />
              </div>
              <p className="text-gray-600">Environmental and biological variables ranked by predictive power</p>
            </div>
            <div className="p-6">
              <FeatureImportanceChart features={results.featureImportance} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};