import express from 'express';
import { DocumentRepository } from './repositories/document.repository';
import { DocumentService } from './services/document.service';
import { QueueService } from './services/queue.service';
import { ProcessorService } from './services/processor.service';
import { DocumentController } from './controllers/document.controller';
import { validateUploadRequest } from './middleware/validation';
import { errorHandler } from './middleware/error-handler';


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
app.post('/api/documents/upload', validateUploadRequest, documentController.upload);
app.get('/api/documents/:id', documentController.getById);
app.get('/api/documents/:id/status', documentController.getStatus);
app.get('/api/documents', documentController.list);
app.delete('/api/documents/:id', documentController.deleteById);

app.use(errorHandler);

export default app;
