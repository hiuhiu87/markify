/**
 * Export/Import button component with dropdown menu
 */

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  exportToMarkdown, 
  exportToHTML, 
  exportToJSON, 
  importFile, 
  importJSONDocument, 
  isValidImportFile 
} from '@/utils/file-utils';
import { DocumentMetadata } from '@/utils/file-utils';

interface ExportImportButtonProps {
  htmlContent: string;
  markdownContent: string;
  metadata: DocumentMetadata;
  onImport: (htmlContent: string, markdownContent?: string, metadata?: DocumentMetadata) => void;
  isDarkMode?: boolean;
}

export const ExportImportButton: React.FC<ExportImportButtonProps> = ({
  htmlContent,
  markdownContent,
  metadata,
  onImport,
  isDarkMode = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportMarkdown = () => {
    exportToMarkdown(markdownContent, { filename: metadata.title || 'document' });
    setIsOpen(false);
  };

  const handleExportHTML = () => {
    exportToHTML(htmlContent, { filename: metadata.title || 'document' });
    setIsOpen(false);
  };

  const handleExportJSON = () => {
    exportToJSON(htmlContent, markdownContent, metadata, { 
      filename: metadata.title || 'document' 
    });
    setIsOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
    setIsOpen(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImportFile(file)) {
      alert('Please select a valid file type (.md, .txt, .html, .json)');
      return;
    }

    try {
      if (file.name.endsWith('.json')) {
        const { html, markdown, metadata: importedMetadata } = await importJSONDocument(file);
        onImport(html, markdown, importedMetadata);
      } else {
        const content = await importFile(file);
        
        if (file.name.endsWith('.html') || file.name.endsWith('.htm')) {
          onImport(content);
        } else {
          // For .md and .txt files, convert to basic HTML
          const htmlContent = convertMarkdownToHTML(content);
          onImport(htmlContent, content);
        }
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import file. Please check the file format and try again.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const convertMarkdownToHTML = (markdown: string): string => {
    // Basic markdown to HTML conversion
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/^\*(.*)\*/gm, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm"
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isDarkMode
                ? "bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            }`}
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" 
              />
            </svg>
            Export/Import
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className={`w-48 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <div className={`px-3 py-2 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            Export Options
          </div>
          
          <DropdownMenuItem 
            onClick={handleExportMarkdown}
            className={`cursor-pointer ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-300' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export as Markdown (.md)
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={handleExportHTML}
            className={`cursor-pointer ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-300' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Export as HTML (.html)
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={handleExportJSON}
            className={`cursor-pointer ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-300' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            Export with Metadata (.json)
          </DropdownMenuItem>

          <DropdownMenuSeparator className={isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} />

          <div className={`px-3 py-2 text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            Import Options
          </div>

          <DropdownMenuItem 
            onClick={handleImportClick}
            className={`cursor-pointer ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-300' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import File (.md, .html, .json)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.txt,.html,.htm,.json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
