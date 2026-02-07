import { Document } from '../models/document.model';

export class DocumentRepository {
  private documents = new Map<string, Document>();

  create(document: Document): void {
    this.documents.set(document.id, document);
  }

  findById(id: string): Document | undefined {
    return this.documents.get(id);
  }

  findAll(): Document[] {
    return Array.from(this.documents.values());
  }

  update(document: Document): void {
    this.documents.set(document.id, document);
  }

  delete(id: string): boolean {
    return this.documents.delete(id);
  }
}
