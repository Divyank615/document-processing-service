import { DocumentStatus, FileType, ProcessingResult } from '../types';

export interface Document {
  id: string;
  filename: string;
  fileType: FileType;
  status: DocumentStatus;
  content: string;

  progress: number;

  result?: ProcessingResult;
  error?: string;

  createdAt: Date;
  updatedAt: Date;
}
