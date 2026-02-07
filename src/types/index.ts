export type FileType = 'pdf' | 'csv' | 'txt';

export type DocumentStatus =
  | 'uploaded'
  | 'processing'
  | 'completed'
  | 'failed';

export interface ProcessingResult {
  text: string;
  tables?: any[];
  metadata?: Record<string, any>;
}
