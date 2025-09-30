import React from 'react';
import { Users, Microscope, BarChart3, Award } from 'lucide-react';
import { ClusterData } from '../../types';

interface ClusterTableProps {
  clusters: ClusterData[];
}

export const ClusterTable: React.FC<ClusterTableProps> = ({ clusters }) => {
  const getClusterColor = (cluster: number) => {
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];
    return colors[(cluster - 1) % colors.length];
  };

  const getDiversityLevel = (diversity: number) => {
    if (diversity >= 3.5) return { level: 'High', color: 'text-green-600 bg-green-100' };
    if (diversity >= 2.5) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-red-600 bg-red-100' };
  };

  const sortedClusters = [...clusters].sort((a, b) => b.size - a.size);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cluster
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sample Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dominant Species
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Diversity Index
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Characteristics
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedClusters.map((cluster) => {
            const diversityInfo = getDiversityLevel(cluster.diversity);
            const clusterColor = getClusterColor(cluster.cluster);
            
            return (
              <tr key={cluster.cluster} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: clusterColor }}
                    />
                    <span className="text-lg font-semibold text-gray-900">
                      #{cluster.cluster}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{cluster.size}</span>
                    <span className="text-sm text-gray-500">
                      ({((cluster.size / 150) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Microscope className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-900 italic">
                      {cluster.dominantSpecies}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-medium text-gray-900">
                      {cluster.diversity.toFixed(2)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${diversityInfo.color}`}>
                      {diversityInfo.level}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {cluster.size > 40 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Award className="h-3 w-3 mr-1" />
                        Dominant
                      </span>
                    )}
                    {cluster.diversity > 3.5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        High Diversity
                      </span>
                    )}
                    {cluster.size < 25 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        Rare
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};