export interface AnalysisData {
  filename: string;
  samples: number;
  features: number;
  data: any[];
  preview: {
    headers: string[];
    rows: any[][];
  };
  isSimulated?: boolean;
}

export type PipelineStep = 'upload' | 'pipeline' | 'analysis' | 'results';

export interface UmapPoint {
  x: number;
  y: number;
  status: string;
  color: string;
  cluster: number;
}

export interface ClusterData {
  cluster: number;
  size: number;
  dominantSpecies: string;
  diversity: number;
}

export interface PerformanceMetrics {
  classificationAccuracy: number;
  regressionMSE: number;
  rSquared: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  category: string;
}

export interface ModelResults {
  umapData: UmapPoint[];
  clusterData: ClusterData[];
  performanceMetrics: PerformanceMetrics;
  featureImportance: FeatureImportance[];
}