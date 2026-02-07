import express from 'express';
import { DocumentRepository } from './repositories/document.repository';
import { DocumentService } from './services/document.service';
import { QueueService } from './services/queue.service';
import { ProcessorService } from './services/processor.service';
import { DocumentController } from './controllers/document.controller';

const app = express();

app.use(express.json());

const documentRepository = new DocumentRepository();
const queueService = new QueueService();
const processorService = new ProcessorService();

const documentService = new DocumentService(
  documentRepository,
  queueService,
  processorService
);

const documentController = new DocumentController(documentService);

app.post('/api/documents/:id/process', documentController.process);

export default app;
