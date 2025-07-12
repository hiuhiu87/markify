/**
 * File utility functions for export/import functionality
 */

export interface ExportOptions {
  filename?: string;
  includeMetadata?: boolean;
}

export interface DocumentMetadata {
  title: string;
  createdAt: string;
  modifiedAt: string;
  wordCount: number;
  charCount: number;
}

/**
 * Export markdown content to a .md file
 */
export const exportToMarkdown = (content: string, options: ExportOptions = {}) => {
  const { filename = 'document.md' } = options;
  
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Export HTML content to a .html file
 */
export const exportToHTML = (content: string, options: ExportOptions = {}) => {
  const { filename = 'document.html' } = options;
  
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Document</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        pre {
            background: #f4f4f4;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 0;
            padding-left: 1rem;
            color: #666;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
  
  const blob = new Blob([htmlTemplate], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Export as JSON with metadata
 */
export const exportToJSON = (
  htmlContent: string, 
  markdownContent: string, 
  metadata: DocumentMetadata,
  options: ExportOptions = {}
) => {
  const { filename = 'document.json' } = options;
  
  const exportData = {
    metadata,
    content: {
      html: htmlContent,
      markdown: markdownContent
    },
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Import file content
 */
export const importFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Import JSON document with metadata
 */
export const importJSONDocument = (file: File): Promise<{
  html: string;
  markdown: string;
  metadata: DocumentMetadata;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.content && data.metadata) {
          resolve({
            html: data.content.html,
            markdown: data.content.markdown,
            metadata: data.metadata
          });
        } else {
          reject(new Error('Invalid JSON document format'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Validate file type for import
 */
export const isValidImportFile = (file: File): boolean => {
  const validTypes = ['text/markdown', 'text/plain', 'application/json', 'text/html'];
  const validExtensions = ['md', 'txt', 'json', 'html', 'htm'];
  
  return validTypes.includes(file.type) || 
         validExtensions.includes(getFileExtension(file.name));
};
