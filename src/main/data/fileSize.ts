import fs from 'fs';
import path from 'path';

const formatSize = (publicPath: string): string => {
  try {
    const abs = path.join(process.cwd(), 'src', publicPath);
    const bytes = fs.statSync(abs).size;
    const kb = bytes / 1024;
    return kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
  } catch {
    return '';
  }
};

export { formatSize };
