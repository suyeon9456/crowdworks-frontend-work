import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { PdfPageHighlightContainer } from './styles';
import { HIGHLIGHT_BORDER, HIGHLIGHT_COLOR } from '@/commons/pdf';

interface HighlightHandle {
  init: () => void;
}

interface Props {
  selectedText: string | null;
}

const Highlight = forwardRef<HighlightHandle, Props>(({ selectedText }: Props, ref) => {
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot>(null);

  const initializeHighlightContainer = () => {
    if (highlightContainerRef.current && !shadowRootRef.current) {
      shadowRootRef.current = highlightContainerRef.current.attachShadow({ mode: 'open' });

      const highlight = document.createElement('div');
      highlight.className = 'highlight';
      shadowRootRef.current.appendChild(highlight);
      highlightRef.current = highlight;
    }
  };

  const updateHighlightPosition = (textDiv: HTMLElement, highlight: HTMLDivElement) => {
    const rect = textDiv.getBoundingClientRect();
    const containerRect = highlightContainerRef.current?.getBoundingClientRect();

    if (containerRect) {
      highlight.style.left = `${rect.left - containerRect.left}px`;
      highlight.style.top = `${rect.top - containerRect.top}px`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
      highlight.style.display = 'block';
      highlight.style.position = 'absolute';
      highlight.style.backgroundColor = HIGHLIGHT_COLOR;
      highlight.style.border = `2px solid ${HIGHLIGHT_BORDER}`;
    }
  };

  useEffect(() => {
    if (!shadowRootRef.current || !highlightRef.current) return;

    const highlight = highlightRef.current;
    const textDiv = document.getElementById(`pdf-text-${selectedText}`);

    if (textDiv && selectedText) {
      updateHighlightPosition(textDiv, highlight);
    } else {
      highlight.style.display = 'none';
    }
  }, [selectedText]);

  const init = () => {
    initializeHighlightContainer();
  };

  useImperativeHandle(ref, () => ({
    init,
  }));

  return <PdfPageHighlightContainer style={{ display: 'block' }} ref={highlightContainerRef} />;
});

export default Highlight;
