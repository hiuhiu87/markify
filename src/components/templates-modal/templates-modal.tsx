/**
 * Document templates modal component
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  documentTemplates, 
  getTemplateCategories, 
  getTemplatesByCategory,
  DocumentTemplate 
} from '@/utils/document-templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
  isDarkMode?: boolean;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  isDarkMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Basic');
  const [previewTemplate, setPreviewTemplate] = useState<DocumentTemplate | null>(null);
  
  const categories = getTemplateCategories();
  const templates = getTemplatesByCategory(selectedCategory);

  if (!isOpen) return null;

  const handleSelectTemplate = (template: DocumentTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-6xl max-h-[80vh] m-4 rounded-lg shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Document Templates
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Choose a template to get started quickly
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(80vh-88px)]">
          {/* Categories Sidebar */}
          <div className={`w-48 border-r overflow-y-auto ${
            isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="p-4">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? isDarkMode 
                          ? 'bg-blue-900/50 text-blue-300' 
                          : 'bg-blue-50 text-blue-700'
                        : isDarkMode 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'border-slate-700 bg-slate-800 hover:border-blue-500' 
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    } hover:shadow-lg`}
                    onClick={() => setPreviewTemplate(template)}
                  >
                    <div className="p-4">
                      <h4 className={`font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {template.name}
                      </h4>
                      <p className={`text-xs mb-3 line-clamp-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        {template.description}
                      </p>
                      
                      {/* Preview */}
                      <div className={`border rounded p-2 mb-3 ${
                        isDarkMode ? 'border-slate-600' : 'border-gray-200'
                      }`}>
                        <pre className={`text-xs font-mono leading-relaxed line-clamp-4 ${
                          isDarkMode ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {template.preview}
                        </pre>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTemplate(template);
                          }}
                          className="text-xs"
                        >
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTemplate(template);
                          }}
                          className="text-xs"
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {previewTemplate && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className={`w-full max-w-4xl max-h-[90%] m-4 rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            }`}>
              {/* Preview Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {previewTemplate.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {previewTemplate.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSelectTemplate(previewTemplate)}
                    size="sm"
                  >
                    Use Template
                  </Button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-slate-700 text-slate-400' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className={`border rounded-lg p-4 ${
                  isDarkMode ? 'border-slate-600 bg-slate-900' : 'border-gray-200 bg-gray-50'
                }`}>
                  <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {previewTemplate.preview}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
