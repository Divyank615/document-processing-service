import { Document } from '../models/document.model';
import { DocumentRepository } from '../repositories/document.repository';
import { FileType } from '../types';
import { QueueService } from './queue.service';
import { ProcessorService } from './processor.service';


export class DocumentService {
  constructor(
    private readonly repository: DocumentRepository,
    private readonly queue: QueueService,
    private readonly processor: ProcessorService
  ) { }

  createDocument(
    id: string,
    filename: string,
    fileType: FileType,
    content: string
  ): Document {
    const now = new Date();

    const document: Document = {
      id,
      filename,
      fileType,
      content,
      status: 'uploaded',
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };

    this.repository.create(document);
    return document;
  }

  getDocumentById(id: string): Document | undefined {
    return this.repository.findById(id);
  }

  getAllDocuments(): Document[] {
    return this.repository.findAll();
  }

  deleteDocument(id: string): boolean {
    return this.repository.delete(id);
  }

  processDocument(id: string): void {
    const document = this.repository.findById(id);

    if (!document) {
      throw new Error('Document not found');
    }

    this.queue.add(async () => {
      try {
        const result = await this.processor.process(document);
        document.result = result;
        document.updatedAt = new Date();
        this.repository.update(document);
      } catch (error) {
        document.status = 'failed';
        document.error = 'Processing failed';
        document.updatedAt = new Date();
        this.repository.update(document);
      }
    });
  }

}
