import React, { useState } from 'react';
import { Save, Upload, Trash2, Calendar, Award, AlertCircle } from 'lucide-react';

interface ModelManagementProps {
  savedModels: string[];
  setSavedModels: (models: string[]) => void;
  hasResults: boolean;
}

export const ModelManagement: React.FC<ModelManagementProps> = ({ 
  savedModels, 
  setSavedModels, 
  hasResults 
}) => {
  const [modelName, setModelName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const saveModel = () => {
    if (modelName.trim()) {
      const timestamp = new Date().toISOString();
      const newModel = `${modelName.trim()}_${timestamp.split('T')[0]}`;
      setSavedModels([...savedModels, newModel]);
      setModelName('');
      setShowSaveDialog(false);
    }
  };

  const deleteModel = (model: string) => {
    setSavedModels(savedModels.filter(m => m !== model));
  };

  const loadModel = (model: string) => {
    // Simulate model loading
    console.log('Loading model:', model);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Model Management</h3>
        <p className="text-gray-600">Save trained models for future use or load previously saved models</p>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Save Model */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Save className="h-5 w-5 text-blue-600" />
              <span>Save Current Model</span>
            </h4>
            
            {hasResults ? (
              <div className="space-y-3">
                {!showSaveDialog ? (
                  <button
                    onClick={() => setShowSaveDialog(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Model
                  </button>
                ) : (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <input
                      type="text"
                      placeholder="Enter model name..."
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={saveModel}
                        disabled={!modelName.trim()}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowSaveDialog(false);
                          setModelName('');
                        }}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg text-gray-500">
                <AlertCircle className="h-5 w-5" />
                <span>Complete analysis to save model</span>
              </div>
            )}
          </div>

          {/* Load Model */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Upload className="h-5 w-5 text-green-600" />
              <span>Saved Models ({savedModels.length})</span>
            </h4>
            
            {savedModels.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {savedModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{model.split('_')[0]}</p>
                        <p className="text-sm text-gray-500 flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{model.split('_').slice(1).join('_')}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadModel(model)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteModel(model)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg text-gray-500">
                <AlertCircle className="h-5 w-5" />
                <span>No saved models available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};