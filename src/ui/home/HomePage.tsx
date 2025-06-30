"use client";

import { useState, useEffect } from "react";
import { Editor } from "@/components/tiptap-templates/simple/editor";
import { useTurndownHTML } from "@/ui/home/useTurndownHTML";
import { useResizable } from "@/hooks/use-resizable";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

const DEFAULT_CONTENT = "<h1>Welcome to Markify</h1><p>Start typing to convert text to markdown in real-time!</p>";

const HomePage = () => {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_CONTENT);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const markdown = useTurndownHTML(htmlContent);
  const { leftWidth, rightWidth, handleMouseDown, handleMouseMove, handleMouseUp } = useResizable(50);

  const handleContentChange = (html: string) => {
    setHtmlContent(html);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={`h-screen flex w-full transition-colors duration-300 ${
      isDarkMode ? "bg-slate-900" : "bg-gray-50"
    }`}>
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Markify
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />

          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDarkMode
              ? "bg-emerald-900/30 text-emerald-400 border border-emerald-500/30"
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
          }`}>
            Live Preview
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-16">
        {/* Editor Panel */}
        <div
          className={`relative transition-all duration-200 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}
          style={{ width: `${leftWidth}%` }}
        >
          <div className="h-full flex flex-col">
            <div className={`px-6 py-4 border-b ${
              isDarkMode ? "border-slate-700" : "border-gray-200"
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold flex items-center space-x-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>Rich Text Editor</span>
                </h2>
                <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                  {htmlContent.length} characters
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
              <div className={`h-full rounded-lg border transition-colors ${
                isDarkMode
                  ? "border-slate-600 bg-slate-750"
                  : "border-gray-200 bg-gray-50"
              }`}>
                <Editor
                  content={DEFAULT_CONTENT}
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
            isDarkMode
              ? "bg-slate-700 hover:bg-slate-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className={`absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 transition-colors ${
            isDarkMode ? "bg-slate-500" : "bg-gray-400"
          } group-hover:bg-blue-500`} />

          {/* Drag indicator dots */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${
                isDarkMode ? "bg-slate-400" : "bg-gray-500"
              }`} />
            ))}
          </div>
        </div>

        {/* Markdown Output Panel */}
        <div
          className={`relative transition-all duration-200 ${
            isDarkMode ? "bg-slate-900" : "bg-gray-50"
          }`}
          style={{ width: `${rightWidth}%` }}
        >
          <div className="h-full flex flex-col">
            <div className={`px-6 py-4 border-b ${
              isDarkMode ? "border-slate-700" : "border-gray-200"
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold flex items-center space-x-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>Markdown Output</span>
                </h2>
                <button className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}>
                  Copy
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className={`h-full rounded-lg border transition-colors ${
                isDarkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-gray-200 bg-white"
              }`}>
                <pre className={`p-4 whitespace-pre-wrap font-mono text-sm leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}>
                  {markdown || (
                    <span className={`italic ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
                      Start typing in the editor to see markdown output...
                    </span>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-6 text-xs border-t ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-slate-400"
          : "bg-white border-gray-200 text-gray-500"
      }`}>
        <div className="flex items-center space-x-4">
          <span>Ready</span>
          <span>•</span>
          <span>Lines: {markdown.split("\n").length}</span>
          <span>•</span>
          <span>Words: {markdown.split(/\s+/).filter(w => w).length}</span>
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