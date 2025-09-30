import React from 'react';
import { UmapPoint } from '../../types';

interface UmapPlotProps {
  data: UmapPoint[];
}

export const UmapPlot: React.FC<UmapPlotProps> = ({ data }) => {
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  
  const xExtent = [
    Math.min(...data.map(d => d.x)) - 1,
    Math.max(...data.map(d => d.x)) + 1
  ];
  const yExtent = [
    Math.min(...data.map(d => d.y)) - 1,
    Math.max(...data.map(d => d.y)) + 1
  ];

  const xScale = (x: number) => 
    margin.left + ((x - xExtent[0]) / (xExtent[1] - xExtent[0])) * (width - margin.left - margin.right);
  
  const yScale = (y: number) => 
    height - margin.bottom - ((y - yExtent[0]) / (yExtent[1] - yExtent[0])) * (height - margin.top - margin.bottom);

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="border border-gray-200 rounded-lg bg-white">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        
        {/* Axes */}
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke="#6b7280"
          strokeWidth="2"
        />

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-sm fill-gray-600"
        >
          UMAP 1
        </text>
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          transform={`rotate(-90, 15, ${height / 2})`}
          className="text-sm fill-gray-600"
        >
          UMAP 2
        </text>

        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={xScale(point.x)}
            cy={yScale(point.y)}
            r="4"
            fill={point.color}
            fillOpacity="0.7"
            stroke="white"
            strokeWidth="1"
            className="hover:r-6 transition-all cursor-pointer"
          >
            <title>{`Status: ${point.status}\nCluster: ${point.cluster}\nUMAP: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
};