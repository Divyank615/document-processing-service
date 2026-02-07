// src/services/processor.service.ts

import { Document } from '../models/document.model';
import { ProcessingResult } from '../types';

export class ProcessorService {
  async process(document: Document): Promise<ProcessingResult> {
    // Step 1: mark processing started
    document.status = 'processing';
    document.progress = 0;

    // Step 2: fake progress + delay
    await this.delay(1000);
    document.progress = 30;

    await this.delay(1000);
    document.progress = 60;

    await this.delay(1000);
    document.progress = 90;

    // Step 3: fake result
    const result: ProcessingResult = {
      text: `Extracted text from ${document.fileType} file`,
      tables: [],
      metadata: {
        filename: document.filename,
      },
    };

    // Step 4: mark completed
    document.status = 'completed';
    document.progress = 100;
    document.updatedAt = new Date();

    return result;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
