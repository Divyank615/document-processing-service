// src/services/document.service.ts

import { Document } from '../models/document.model';
import { DocumentRepository } from '../repositories/document.repository';
import { FileType } from '../types';

export class DocumentService {
  constructor(private readonly repository: DocumentRepository) { }

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
}
