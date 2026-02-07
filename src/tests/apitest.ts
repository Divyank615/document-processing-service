import request from 'supertest';
import app from '../app';

describe('Document API', () => {
  let documentId: string;

  it('should upload a document', async () => {
    const res = await request(app)
      .post('/api/documents/upload')
      .send({
        filename: 'test.txt',
        content: Buffer.from('hello world').toString('base64'),
        fileType: 'txt',
      });

    expect(res.status).toBe(201);
    expect(res.body.documentId).toBeDefined();
    expect(res.body.status).toBe('uploaded');

    documentId = res.body.documentId;
  });

  it('should start processing the document', async () => {
    const res = await request(app)
      .post(`/api/documents/${documentId}/process`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('processing');
  });

  it('should return document status', async () => {
    const res = await request(app)
      .get(`/api/documents/${documentId}/status`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.status).toBeDefined();
    expect(res.body.progress).toBeGreaterThanOrEqual(0);
  });
});
