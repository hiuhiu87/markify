import { useMemo } from "react";
import TurndownService from "turndown";

export const useTurndownHTML = (html: string) => {
  const turndownService = useMemo(() => {
    return new TurndownService({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full"
    });
  }, []);

  return useMemo(() => {
    if (!html) return "";
    return turndownService.turndown(html);
  }, [html, turndownService]);
};