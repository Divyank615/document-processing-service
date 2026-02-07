/**
 * Sleep / delay utility (used for simulating async processing)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate document ID
 */
export const generateDocumentId = (uuid: string): string => {
  return `doc_${uuid}`;
};

/**
 * Check if value is a valid string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};
