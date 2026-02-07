import { Request, Response } from 'express';
import { DocumentService } from '../services/document.service';

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
}
