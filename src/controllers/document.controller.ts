import { Request, Response } from 'express';
import { DocumentService } from '../services/document.service';
import { v4 as uuidv4 } from 'uuid';
import { FileType } from '../types';


export class DocumentController {
  constructor(private readonly service: DocumentService) { }

  process = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      this.service.processDocument(id);
      return res.json({ status: 'processing' });
    } catch (e) {
      return res.status(404).json({ error: 'Document not found' });
    }
  };

  upload = (req: Request, res: Response) => {
    const { filename, content, fileType } = req.body;

    if (!filename || !content || !fileType) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const id = `doc_${uuidv4()}`;

    const document = this.service.createDocument(
      id,
      filename,
      fileType as FileType,
      content
    );

    return res.status(201).json({
      documentId: document.id,
      status: document.status,
    });
  };
  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    const document = this.service.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.json(document);
  };

  getStatus = (req: Request, res: Response) => {
    const { id } = req.params;

    const document = this.service.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.json({
      status: document.status,
      progress: document.progress,
      result: document.result,
    });
  };
}
