'use client';

import { ExportImportButton } from '@/components/export-import-button/export-import-button';
import { StatisticsPanel } from '@/components/statistics-panel/statistics-panel';
import { TemplatesModal } from '@/components/templates-modal/templates-modal';
import { Editor } from '@/components/tiptap-templates/simple/editor';
import { ThemeToggle } from '@/components/tiptap-templates/simple/theme-toggle';
import { Button } from '@/components/ui/button';
import { useResizable } from '@/hooks/use-resizable';
import { useTurndownHTML } from '@/ui/home/useTurndownHTML';
import { DocumentTemplate } from '@/utils/document-templates';
import { DocumentMetadata } from '@/utils/file-utils';
import { isAutoSaveEnabled, loadCurrentDocument, saveCurrentDocument } from '@/utils/storage-utils';
import { useEffect, useState } from 'react';

const DEFAULT_CONTENT =
  '<h1>Welcome to Markify</h1><p>Start typing to convert text to markdown in real-time!</p>';

const HomePage = () => {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_CONTENT);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  const markdown = useTurndownHTML(htmlContent);
  const { leftWidth, rightWidth, handleMouseDown, handleMouseMove, handleMouseUp } =
    useResizable(50);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (isAutoSaveEnabled() && htmlContent !== DEFAULT_CONTENT) {
        saveCurrentDocument(htmlContent, markdown, documentTitle);
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [htmlContent, markdown, documentTitle]);

  // Load saved document on mount
  useEffect(() => {
    const savedDoc = loadCurrentDocument();
    if (savedDoc) {
      setHtmlContent(savedDoc.htmlContent);
      setDocumentTitle(savedDoc.title);
      setLastSaved(new Date(savedDoc.modifiedAt));
    }
  }, []);

  const handleContentChange = (html: string) => {
    setHtmlContent(html);
  };

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setHtmlContent(template.content);
    setDocumentTitle(template.name);
    setEditorKey((prev) => prev + 1);
  };

  const handleImport = (html: string, markdown?: string, metadata?: DocumentMetadata) => {
    setHtmlContent(html);
    if (metadata) {
      setDocumentTitle(metadata.title);
    }
    setEditorKey((prev) => prev + 1);
  };

  const getDocumentMetadata = (): DocumentMetadata => ({
    title: documentTitle,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    wordCount: markdown.split(/\s+/).filter((w) => w).length,
    charCount: htmlContent.length
  });

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`h-screen flex w-full transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Markify
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Templates Button */}
          <Button
            onClick={() => setShowTemplates(true)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
            }`}>
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Templates
          </Button>

          {/* Export/Import Button */}
          <ExportImportButton
            htmlContent={htmlContent}
            markdownContent={markdown}
            metadata={getDocumentMetadata()}
            onImport={handleImport}
            isDarkMode={isDarkMode}
          />

          {/* Statistics Toggle */}
          <Button
            onClick={() => setShowStatistics(!showStatistics)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              showStatistics
                ? isDarkMode
                  ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
                : isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
            }`}>
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Statistics
          </Button>

          <ThemeToggle setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />

          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}>
            Live Preview
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-16">
        {/* Statistics Panel */}
        {showStatistics && (
          <div className="w-80 flex-shrink-0 p-4">
            <StatisticsPanel
              htmlContent={htmlContent}
              markdownContent={markdown}
              isDarkMode={isDarkMode}
              className="sticky top-4"
            />
          </div>
        )}
        {/* Editor Panel */}
        <div
          className={`relative transition-all duration-200 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}
          style={{ width: `${leftWidth}%` }}>
          <div className="h-full flex flex-col">
            <div
              className={`px-6 py-4 border-b ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
              <div className="flex items-center justify-between">
                <h2
                  className={`text-lg font-semibold flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>Rich Text Editor</span>
                </h2>
                <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {htmlContent.length} characters •{' '}
                  {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Unsaved'}
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
              <div
                className={`h-full rounded-lg border transition-colors ${
                  isDarkMode ? 'border-slate-600 bg-slate-750' : 'border-gray-200 bg-gray-50'
                }`}>
                <Editor
                  key={editorKey}
                  content={htmlContent || DEFAULT_CONTENT}
                  onContentChange={(html) => {
                    if (!html) return;
                    handleContentChange(html.toString());
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className={`group relative w-2 cursor-col-resize flex-shrink-0 transition-all duration-200 ${
            isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onMouseDown={handleMouseDown}>
          <div
            className={`absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 transition-colors ${
              isDarkMode ? 'bg-slate-500' : 'bg-gray-400'
            } group-hover:bg-blue-500`}
          />

          {/* Drag indicator dots */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-slate-400' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        </div>

        {/* Markdown Output Panel */}
        <div
          className={`relative transition-all duration-200 ${
            isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
          }`}
          style={{ width: `${rightWidth}%` }}>
          <div className="h-full flex flex-col">
            <div
              className={`px-6 py-4 border-b ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
              <div className="flex items-center justify-between">
                <h2
                  className={`text-lg font-semibold flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>Markdown Output</span>
                </h2>
                <button
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => {
                    navigator.clipboard.writeText(markdown);
                  }}>
                  Copy
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div
                className={`h-full rounded-lg border transition-colors ${
                  isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'
                }`}>
                <pre
                  className={`p-4 whitespace-pre-wrap font-mono text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                  {markdown || (
                    <span className={`italic ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                      Start typing in the editor to see markdown output...
                    </span>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleTemplateSelect}
        isDarkMode={isDarkMode}
      />

      {/* Status Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-6 text-xs border-t ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700 text-slate-400'
            : 'bg-white border-gray-200 text-gray-500'
        }`}>
        <div className="flex items-center space-x-4">
          <span>Ready</span>
          <span>•</span>
          <span>Lines: {markdown.split('\n').length}</span>
          <span>•</span>
          <span>Words: {markdown.split(/\s+/).filter((w) => w).length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>Auto-sync enabled</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
