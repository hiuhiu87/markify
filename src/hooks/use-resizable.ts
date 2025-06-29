import { useState, useCallback, useRef } from "react";

export const useResizable = (initialWidth: number = 50) => {
  const [leftWidth, setLeftWidth] = useState(initialWidth);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;

    const containerWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;

    // Constrain between 20% and 80%
    const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
    setLeftWidth(constrainedWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    leftWidth,
    rightWidth: 100 - leftWidth,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};