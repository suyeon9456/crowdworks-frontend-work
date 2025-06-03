import React, { useRef, useEffect, useMemo } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFPageProxy, TextItem } from 'pdfjs-dist/types/src/display/api';
import { PdfPageContainer, PdfPageTextLayer } from './styles';
import { usePdfJsonSelection } from '@/contexts/PdfJsonContext';

const HIGHLIGHT_COLOR = 'rgba(24, 144, 255, 0.1)';
const HIGHLIGHT_BORDER = 'rgba(9, 109, 217)';
const HORIZONTAL_GAP_THRESHOLD = 20;

interface Props {
  scale: number;
  page: PDFPageProxy;
}

interface RenderContext {
  canvasContext: CanvasRenderingContext2D;
  viewport: any;
}

const PdfPage = React.memo(({ scale, page }: Props) => {
  const { selectedText, onChangeSelectedPdfText } = usePdfJsonSelection();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const highlightStyle = useMemo(
    () => `
    .highlight {
      position: absolute;
      background-color: ${HIGHLIGHT_COLOR};
      border: 2px solid ${HIGHLIGHT_BORDER};
      pointer-events: none;
      display: none;
    }
  `,
    [],
  );

  const groupTextItems = (items: any[]): TextItem[] => {
    return items
      .filter((item): item is TextItem => 'str' in item && item.str.trim() !== '')
      .reduce((acc: TextItem[], item: TextItem) => {
        const lastGroup = acc[acc.length - 1];
        if (!lastGroup) return [item];

        const horizontalGap = item.transform[4] - (lastGroup.transform[4] + lastGroup.width);
        if (
          lastGroup &&
          lastGroup.transform[5] === item.transform[5] &&
          horizontalGap < HORIZONTAL_GAP_THRESHOLD
        ) {
          lastGroup.str += item.str;
          lastGroup.width += item.width;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
  };

  const attachTextEventListeners = (
    textDivs: HTMLDivElement[],
    groupedItems: TextItem[],
    onChangeSelectedPdfText: (text: string | null) => void,
  ) => {
    textDivs.forEach((div, index) => {
      const textItem = groupedItems[index];
      if (textItem && 'str' in textItem) {
        div.id = `pdf-text-${textItem.str}`;
        div.style.cursor = 'pointer';

        div.onmouseenter = () => onChangeSelectedPdfText(textItem.str);
        div.onmouseleave = () => onChangeSelectedPdfText(null);
      }
    });
  };

  const renderPdfText = async (
    page: PDFPageProxy,
    viewport: any,
    textLayerRef: React.RefObject<HTMLDivElement | null>,
    onChangeSelectedPdfText: (text: string | null) => void,
  ) => {
    const textContent = await page.getTextContent();
    if (!textLayerRef.current) return;

    textLayerRef.current.style.setProperty('--scale-factor', viewport.scale.toString());

    const groupedItems = groupTextItems(textContent.items);
    const textDivs: HTMLDivElement[] = [];

    await pdfjs.renderTextLayer({
      textContentSource: { ...textContent, items: groupedItems },
      container: textLayerRef.current,
      viewport: viewport,
      textDivs: textDivs,
    }).promise;

    attachTextEventListeners(textDivs, groupedItems, onChangeSelectedPdfText);
  };

  useEffect(() => {
    if (!page) return;

    initializeHighlightContainer();
    renderPdfPage();
  }, [scale, highlightStyle]);

  const initializeHighlightContainer = () => {
    if (highlightContainerRef.current && !shadowRootRef.current) {
      shadowRootRef.current = highlightContainerRef.current.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = highlightStyle;
      shadowRootRef.current.appendChild(style);

      const highlight = document.createElement('div');
      highlight.className = 'highlight';
      shadowRootRef.current.appendChild(highlight);
      highlightRef.current = highlight;
    }
  };

  const renderPdfPage = () => {
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext: RenderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    page.render(renderContext).promise.then(() => {
      console.log('Page rendered');
      if (textLayerRef.current) {
        renderPdfText(page, viewport, textLayerRef, onChangeSelectedPdfText);
      }
    });
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

  const updateHighlightPosition = (textDiv: HTMLElement, highlight: HTMLDivElement) => {
    const rect = textDiv.getBoundingClientRect();
    const containerRect = highlightContainerRef.current?.getBoundingClientRect();

    if (containerRect) {
      highlight.style.left = `${rect.left - containerRect.left}px`;
      highlight.style.top = `${rect.top - containerRect.top}px`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
      highlight.style.display = 'block';
    }
  };

  return (
    <PdfPageContainer>
      <canvas ref={canvasRef} />
      <PdfPageTextLayer ref={textLayerRef} />
      <div
        ref={highlightContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </PdfPageContainer>
  );
});

export default PdfPage;
