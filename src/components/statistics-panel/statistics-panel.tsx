/**
 * Enhanced statistics panel component
 */

import React, { useState } from 'react';
import { useDocumentStatistics, formatStatistics } from '@/hooks/use-document-statistics';

interface StatisticsPanelProps {
  htmlContent: string;
  markdownContent: string;
  isDarkMode?: boolean;
  className?: string;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  htmlContent,
  markdownContent,
  isDarkMode = false,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'readability'>('basic');
  const statistics = useDocumentStatistics(htmlContent, markdownContent);
  const formattedStats = formatStatistics(statistics);

  const tabs = [
    { id: 'basic' as const, label: 'Basic', icon: '📊' },
    { id: 'content' as const, label: 'Content', icon: '📝' },
    { id: 'readability' as const, label: 'Readability', icon: '📖' }
  ];

  return (
    <div className={`${className} ${
      isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
    } rounded-lg border ${
      isDarkMode ? 'border-slate-700' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-2">📈</span>
          Document Statistics
        </h3>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? isDarkMode 
                  ? 'bg-blue-900/50 text-blue-300 border-b-2 border-blue-400' 
                  : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                : isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-3">
          {formattedStats[activeTab].map((stat, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                {stat.label}
              </span>
              <span className={`text-sm font-mono font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {activeTab === 'basic' && (
          <div className={`mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <div className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Avg. Words/Sentence
                </div>
                <div className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {statistics.sentences > 0 
                    ? Math.round(statistics.words / statistics.sentences) 
                    : 0}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <div className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Avg. Words/Paragraph
                </div>
                <div className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {statistics.paragraphs > 0 
                    ? Math.round(statistics.words / statistics.paragraphs) 
                    : 0}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Analysis */}
        {activeTab === 'content' && (
          <div className={`mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                  Content Density
                </span>
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {statistics.words > 0 ? (
                    (statistics.headings + statistics.lists + statistics.images) / 
                    Math.ceil(statistics.words / 100)
                  ).toFixed(1) : '0'} elements/100 words
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                  Media Ratio
                </span>
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {statistics.words > 0 ? (
                    (statistics.images / statistics.words * 100)
                  ).toFixed(1) : '0'}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Readability Tips */}
        {activeTab === 'readability' && (
          <div className={`mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <h4 className={`text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                💡 Tips for Better Readability
              </h4>
              <ul className={`text-xs space-y-1 ${
                isDarkMode ? 'text-blue-200' : 'text-blue-600'
              }`}>
                {getReadabilityTips(statistics).map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Get readability tips based on document statistics
 */
const getReadabilityTips = (stats: ReturnType<typeof useDocumentStatistics>): string[] => {
  const tips: string[] = [];
  
  if (stats.sentences > 0) {
    const avgWordsPerSentence = stats.words / stats.sentences;
    if (avgWordsPerSentence > 25) {
      tips.push('Consider shorter sentences (aim for 15-20 words per sentence)');
    }
  }
  
  if (stats.paragraphs > 0) {
    const avgWordsPerParagraph = stats.words / stats.paragraphs;
    if (avgWordsPerParagraph > 150) {
      tips.push('Break long paragraphs into smaller chunks');
    }
  }
  
  if (stats.headings === 0 && stats.words > 200) {
    tips.push('Add headings to structure your content better');
  }
  
  if (stats.headings > 0) {
    const wordsPerHeading = stats.words / stats.headings;
    if (wordsPerHeading > 300) {
      tips.push('Consider adding more subheadings for better organization');
    }
  }
  
  if (stats.readingLevel === 'Very Difficult' || stats.readingLevel === 'Difficult') {
    tips.push('Simplify complex sentences and use common words');
  }
  
  if (tips.length === 0) {
    tips.push('Your document has good readability!');
  }
  
  return tips.slice(0, 3); // Limit to 3 tips
};
