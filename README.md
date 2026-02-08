# Document Processing Service

This is a backend API service that allows users to upload documents and process them asynchronously.
It is a simplified version of a document OCR / extraction system.

## How to Run the Project

### Prerequisites
- Node.js (v18 or above)
- Yarn

### Install Dependencies
```bash
yarn install

# Start the Server
yarn dev

# The server will start on:
http://localhost:3000

# Run Tests
yarn test

# API Endpoints and Examples

1. Upload a Document : POST /api/documents/upload

Request Body:
{
  "filename": "invoice.pdf",
  "content": "base64_encoded_string",
  "fileType": "pdf"
}

Response:
{
  "documentId": "doc_123",
  "status": "uploaded"
}

2. Start Document Processing : POST /api/documents/:id/process

Response:
{
  "status": "processing"
}

3. Get Document Status : GET /api/documents/:id/status

Response:
{
  "status": "completed",
  "progress": 100,
  "result": {
    "text": "Extracted text from pdf file",
    "tables": [],
    "metadata": {
      "filename": "invoice.pdf"
    }
  }
}

4. Get Document by ID : GET /api/documents/:id

5. List Documents : GET /api/documents?status=completed

6. Delete Document : DELETE /api/documents/:id


# Architecture Decisions

The project follows a clean and modular architecture to keep the code maintainable and testable.

** Controller → Service → Queue → Processor → Repository

Controllers handle HTTP request and response logic.
Services contain business logic and orchestration.
A custom in-memory queue is used for background processing.
The processor simulates asynchronous document processing.
An in-memory repository is used for storing documents.
Middleware is used for validation and centralized error handling.

** This separation of concerns makes the application easy to understand and extend.

# What I’d Improve with More Time

Can Add database instead of in-memory storage
Implement automatic retry mechanism for failed processing
Add pagination for listing documents
Perform real document parsing for PDF and CSV files
Add authentication and authorization
Improve logging and monitoring
