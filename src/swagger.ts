import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Document Processing API',
      version: '1.0.0',
      description: 'API documentation for Document Processing Service',
    },
    paths: {
      '/api/documents/upload': {
        post: {
          summary: 'Upload a document',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    filename: { type: 'string' },
                    content: { type: 'string' },
                    fileType: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Document uploaded successfully' },
          },
        },
      },

      '/api/documents/{id}/process': {
        post: {
          summary: 'Start document processing',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Processing started' },
          },
        },
      },

      '/api/documents/{id}': {
        get: {
          summary: 'Get document by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Document fetched successfully' },
            404: { description: 'Document not found' },
          },
        },
        delete: {
          summary: 'Delete document',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            204: { description: 'Document deleted' },
          },
        },
      },

      '/api/documents/{id}/status': {
        get: {
          summary: 'Get document processing status',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Status fetched successfully' },
          },
        },
      },

      '/api/documents': {
        get: {
          summary: 'List all documents',
          parameters: [
            {
              name: 'status',
              in: 'query',
              required: false,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Documents list returned' },
          },
        },
      },
    },
  },
  apis: [],
});
