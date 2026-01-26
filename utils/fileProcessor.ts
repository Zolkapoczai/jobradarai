import { FileInput } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

/**
 * Validates if the file is a PDF and within size limits.
 */
export const validatePdf = (file: File): { valid: boolean; error?: 'invalid_type' | 'file_too_large' } => {
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'invalid_type' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'file_too_large' };
  }
  return { valid: true };
};

/**
 * Reads a File object and converts it to a base64 FileInput structure.
 * Supports an optional progress callback for UI updates.
 */
export const processPdfFile = (
  file: File, 
  onProgress?: (percent: number) => void
): Promise<FileInput> => {
  return new Promise((resolve, reject) => {
    const validation = validatePdf(file);
    if (!validation.valid) {
      return reject(new Error(validation.error));
    }

    const reader = new FileReader();

    if (onProgress) {
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    reader.onload = () => {
      const resultString = reader.result as string;
      const base64 = resultString.split(',')[1]; // Remove data:application/pdf;base64,
      
      resolve({
        data: base64,
        mimeType: file.type,
        name: file.name,
        size: file.size,
      });
    };

    reader.onerror = () => {
      reject(new Error('read_error'));
    };

    reader.readAsDataURL(file);
  });
};
