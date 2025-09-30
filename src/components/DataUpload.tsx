import React, { useState, useCallback } from 'react';
import { Upload, FileText, Database, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { AnalysisData } from '../types';

interface DataUploadProps {
  onDataUpload: (data: AnalysisData) => void;
}

export const DataUpload: React.FC<DataUploadProps> = ({ onDataUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<AnalysisData | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].name.endsWith('.csv')) {
      processFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    
    // Simulate file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1, 6).map(line => 
        line.split(',').map(cell => cell.trim())
      ).filter(row => row.length === headers.length);

      const mockData: AnalysisData = {
        filename: file.name,
        samples: lines.length - 1,
        features: headers.length,
        data: [], // In real app, this would contain parsed data
        preview: {
          headers,
          rows
        }
      };

      setPreviewData(mockData);
    };
    reader.readAsText(file);
  };

  const generateSyntheticData = () => {
    const mockData: AnalysisData = {
      filename: 'synthetic_dataset.csv',
      samples: 150,
      features: 25,
      data: [],
      isSimulated: true,
      preview: {
        headers: ['Sample_ID', 'pH', 'Temperature', 'DO', 'Turbidity', 'Nitrate', 'Species_A', 'Species_B'],
        rows: [
          ['S001', '7.2', '18.5', '8.2', '2.1', '0.5', '120', '87'],
          ['S002', '6.8', '19.1', '7.9', '1.8', '0.3', '95', '112'],
          ['S003', '7.5', '17.8', '8.5', '2.3', '0.7', '143', '76'],
          ['S004', '6.9', '18.9', '8.1', '1.9', '0.4', '108', '98'],
          ['S005', '7.1', '18.2', '8.3', '2.0', '0.6', '132', '89']
        ]
      }
    };

    setPreviewData(mockData);
  };

  const proceedWithData = () => {
    if (previewData) {
      onDataUpload(previewData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload eDNA Dataset</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your environmental DNA dataset containing ASV/OTU abundances and environmental variables, 
          or use our synthetic data for demonstration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* File Upload */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your CSV file here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              Select CSV File
            </label>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">{uploadedFile.name}</p>
                <p className="text-sm text-green-600">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Synthetic Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Database className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Use Synthetic Dataset
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Generate a synthetic eDNA dataset for demonstration and testing purposes.
            </p>
            <button
              onClick={generateSyntheticData}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Demo Data
            </button>
          </div>
        </div>
      </div>

      {/* Data Preview */}
      {previewData && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Data Preview</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Info className="h-4 w-4" />
                  <span>{previewData.samples} samples</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Database className="h-4 w-4" />
                  <span>{previewData.features} features</span>
                </div>
                {previewData.isSimulated && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Synthetic</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {previewData.preview.headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {previewData.preview.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 text-sm text-gray-900">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={proceedWithData}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Proceed to Analysis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};