/**
 * Local storage utilities for auto-save functionality
 */

import { useState, useEffect, useRef } from 'react';

export interface SavedDocument {
  id: string;
  title: string;
  htmlContent: string;
  markdownContent: string;
  createdAt: string;
  modifiedAt: string;
  wordCount: number;
  charCount: number;
}

const STORAGE_KEYS = {
  CURRENT_DOCUMENT: 'markify_current_document',
  SAVED_DOCUMENTS: 'markify_saved_documents',
  AUTO_SAVE_ENABLED: 'markify_auto_save_enabled',
  LAST_AUTO_SAVE: 'markify_last_auto_save'
};

/**
 * Save current document to localStorage
 */
export const saveCurrentDocument = (
  htmlContent: string,
  markdownContent: string,
  title: string = 'Untitled Document'
): void => {
  try {
    const document: SavedDocument = {
      id: 'current',
      title,
      htmlContent,
      markdownContent,
      createdAt: localStorage.getItem(STORAGE_KEYS.CURRENT_DOCUMENT) 
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_DOCUMENT)!).createdAt 
        : new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      wordCount: markdownContent.split(/\s+/).filter(w => w).length,
      charCount: htmlContent.length
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_DOCUMENT, JSON.stringify(document));
    localStorage.setItem(STORAGE_KEYS.LAST_AUTO_SAVE, new Date().toISOString());
  } catch (error) {
    console.warn('Failed to save document to localStorage:', error);
  }
};

/**
 * Load current document from localStorage
 */
export const loadCurrentDocument = (): SavedDocument | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_DOCUMENT);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load document from localStorage:', error);
    return null;
  }
};

/**
 * Save document to saved documents list
 */
export const saveDocument = (
  htmlContent: string,
  markdownContent: string,
  title: string
): string => {
  try {
    const documents = getSavedDocuments();
    const id = generateDocumentId();
    
    const newDocument: SavedDocument = {
      id,
      title,
      htmlContent,
      markdownContent,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      wordCount: markdownContent.split(/\s+/).filter(w => w).length,
      charCount: htmlContent.length
    };

    documents.push(newDocument);
    localStorage.setItem(STORAGE_KEYS.SAVED_DOCUMENTS, JSON.stringify(documents));
    
    return id;
  } catch (error) {
    console.warn('Failed to save document:', error);
    throw new Error('Failed to save document');
  }
};

/**
 * Update existing saved document
 */
export const updateSavedDocument = (
  id: string,
  htmlContent: string,
  markdownContent: string,
  title?: string
): void => {
  try {
    const documents = getSavedDocuments();
    const index = documents.findIndex(doc => doc.id === id);
    
    if (index !== -1) {
      documents[index] = {
        ...documents[index],
        htmlContent,
        markdownContent,
        title: title || documents[index].title,
        modifiedAt: new Date().toISOString(),
        wordCount: markdownContent.split(/\s+/).filter(w => w).length,
        charCount: htmlContent.length
      };
      
      localStorage.setItem(STORAGE_KEYS.SAVED_DOCUMENTS, JSON.stringify(documents));
    }
  } catch (error) {
    console.warn('Failed to update document:', error);
    throw new Error('Failed to update document');
  }
};

/**
 * Get all saved documents
 */
export const getSavedDocuments = (): SavedDocument[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_DOCUMENTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load saved documents:', error);
    return [];
  }
};

/**
 * Get saved document by ID
 */
export const getSavedDocument = (id: string): SavedDocument | null => {
  try {
    const documents = getSavedDocuments();
    return documents.find(doc => doc.id === id) || null;
  } catch (error) {
    console.warn('Failed to load document:', error);
    return null;
  }
};

/**
 * Delete saved document
 */
export const deleteSavedDocument = (id: string): void => {
  try {
    const documents = getSavedDocuments();
    const filtered = documents.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_DOCUMENTS, JSON.stringify(filtered));
  } catch (error) {
    console.warn('Failed to delete document:', error);
    throw new Error('Failed to delete document');
  }
};

/**
 * Clear current document
 */
export const clearCurrentDocument = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_DOCUMENT);
    localStorage.removeItem(STORAGE_KEYS.LAST_AUTO_SAVE);
  } catch (error) {
    console.warn('Failed to clear current document:', error);
  }
};

/**
 * Check if auto-save is enabled
 */
export const isAutoSaveEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_ENABLED);
    return stored ? JSON.parse(stored) : true; // Default to enabled
  } catch (error) {
    return true;
  }
};

/**
 * Set auto-save preference
 */
export const setAutoSaveEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTO_SAVE_ENABLED, JSON.stringify(enabled));
  } catch (error) {
    console.warn('Failed to save auto-save preference:', error);
  }
};

/**
 * Get last auto-save time
 */
export const getLastAutoSaveTime = (): Date | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_AUTO_SAVE);
    return stored ? new Date(stored) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Generate unique document ID
 */
const generateDocumentId = (): string => {
  return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get storage usage information
 */
export const getStorageInfo = (): {
  used: number;
  available: number;
  percentage: number;
} => {
  try {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Estimate 5MB as typical localStorage limit
    const available = 5 * 1024 * 1024;
    const percentage = (used / available) * 100;
    
    return { used, available, percentage };
  } catch (error) {
    return { used: 0, available: 0, percentage: 0 };
  }
};

/**
 * Hook for auto-save functionality
 */
export const useAutoSave = (
  htmlContent: string,
  markdownContent: string,
  title: string,
  delay: number = 2000
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoSaveEnabled()) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      saveCurrentDocument(htmlContent, markdownContent, title);
      setLastSaved(new Date());
      setIsSaving(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [htmlContent, markdownContent, title, delay]);

  return { lastSaved, isSaving };
};
