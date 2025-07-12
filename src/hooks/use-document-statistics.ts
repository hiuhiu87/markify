import { useMemo } from 'react';

export interface DocumentStatistics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  headings: number;
  links: number;
  images: number;
  codeBlocks: number;
  lists: number;
  tables: number;
  readingTime: number; // in minutes
  readingLevel: string;
}

export const useDocumentStatistics = (
  htmlContent: string,
  markdownContent: string
): DocumentStatistics => {
  return useMemo(() => {
    // Basic counts
    const characters = htmlContent.length;
    const charactersNoSpaces = htmlContent.replace(/\s/g, '').length;
    
    // Word count (more accurate)
    const words = markdownContent
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    
    // Sentence count
    const sentences = markdownContent
      .split(/[.!?]+/)
      .filter(sentence => sentence.trim().length > 0).length;
    
    // Paragraph count
    const paragraphs = markdownContent
      .split(/\n\s*\n/)
      .filter(para => para.trim().length > 0).length;
    
    // Line count
    const lines = markdownContent.split('\n').length;
    
    // Heading count
    const headings = (markdownContent.match(/^#{1,6}\s/gm) || []).length;
    
    // Link count
    const links = (markdownContent.match(/\[.*?\]\(.*?\)/g) || []).length;
    
    // Image count
    const images = (markdownContent.match(/!\[.*?\]\(.*?\)/g) || []).length;
    
    // Code block count
    const codeBlocks = (markdownContent.match(/```[\s\S]*?```/g) || []).length;
    
    // List count (both ordered and unordered)
    const lists = (markdownContent.match(/^[\s]*[-*+]\s|^[\s]*\d+\.\s/gm) || []).length;
    
    // Table count
    const tables = (markdownContent.match(/\|.*\|/g) || []).filter((line, index, arr) => {
      // Check if next line contains table separator
      return index < arr.length - 1 && arr[index + 1].includes('|') && arr[index + 1].includes('-');
    }).length / 2; // Divide by 2 since we count header and separator
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Simple reading level calculation (Flesch-Kincaid approximation)
    const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
    const avgSyllablesPerWord = estimateAverageSyllables(markdownContent, words);
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    const readingLevel = getReadingLevel(fleschScore);
    
    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      headings,
      links,
      images,
      codeBlocks,
      lists,
      tables: Math.floor(tables),
      readingTime,
      readingLevel
    };
  }, [htmlContent, markdownContent]);
};

/**
 * Estimate average syllables per word
 */
const estimateAverageSyllables = (text: string, wordCount: number): number => {
  if (wordCount === 0) return 0;
  
  // Simple syllable estimation
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let totalSyllables = 0;
  
  words.forEach(word => {
    // Remove silent e
    let cleanWord = word.replace(/e$/, '');
    // Count vowel groups
    const vowelGroups = cleanWord.match(/[aeiouy]+/g) || [];
    const syllables = Math.max(1, vowelGroups.length);
    totalSyllables += syllables;
  });
  
  return totalSyllables / wordCount;
};

/**
 * Get reading level from Flesch score
 */
const getReadingLevel = (score: number): string => {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
};

/**
 * Format statistics for display
 */
export const formatStatistics = (stats: DocumentStatistics) => {
  return {
    basic: [
      { label: 'Characters', value: stats.characters.toLocaleString() },
      { label: 'Characters (no spaces)', value: stats.charactersNoSpaces.toLocaleString() },
      { label: 'Words', value: stats.words.toLocaleString() },
      { label: 'Sentences', value: stats.sentences.toLocaleString() },
      { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
      { label: 'Lines', value: stats.lines.toLocaleString() }
    ],
    content: [
      { label: 'Headings', value: stats.headings.toLocaleString() },
      { label: 'Links', value: stats.links.toLocaleString() },
      { label: 'Images', value: stats.images.toLocaleString() },
      { label: 'Code Blocks', value: stats.codeBlocks.toLocaleString() },
      { label: 'Lists', value: stats.lists.toLocaleString() },
      { label: 'Tables', value: stats.tables.toLocaleString() }
    ],
    readability: [
      { label: 'Reading Time', value: `${stats.readingTime} min` },
      { label: 'Reading Level', value: stats.readingLevel }
    ]
  };
};
