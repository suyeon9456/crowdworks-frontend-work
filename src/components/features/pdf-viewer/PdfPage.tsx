import React, { useRef, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFPageProxy, TextItem } from 'pdfjs-dist/types/src/display/api';
import { PdfPageContainer, PdfPageHighlightContainer, PdfPageTextLayer } from './styles';
import { usePdfJsonSelection } from '@/contexts/PdfJsonContext';
import { HIGHLIGHT_STYLE, PDF_SCALE } from '@/commons/pdf';
import { getTextItems } from '@/utils/pdf';

interface Props {
  page: PDFPageProxy;
}

interface RenderContext {
  canvasContext: CanvasRenderingContext2D;
  viewport: pdfjs.PageViewport;
}

const PdfPage = React.memo(({ page }: Props) => {
  const { selectedText, onChangeSelectedPdfText } = usePdfJsonSelection();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

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

  const renderPdfText = async (viewport: pdfjs.PageViewport) => {
    const textContent = await page.getTextContent();
    if (!textLayerRef.current) return;

    textLayerRef.current.style.setProperty('--scale-factor', viewport.scale.toString());

    const groupedItems = getTextItems(textContent.items);
    const textDivs: HTMLDivElement[] = [];

    await pdfjs.renderTextLayer({
      textContentSource: { ...textContent, items: groupedItems },
      container: textLayerRef.current,
      viewport: viewport,
      textDivs: textDivs,
    }).promise;

    attachTextEventListeners(textDivs, groupedItems, onChangeSelectedPdfText);
  };

  const initializeHighlightContainer = () => {
    if (highlightContainerRef.current && !shadowRootRef.current) {
      shadowRootRef.current = highlightContainerRef.current.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = HIGHLIGHT_STYLE;
      shadowRootRef.current.appendChild(style);

      const highlight = document.createElement('div');
      highlight.className = 'highlight';
      shadowRootRef.current.appendChild(highlight);
      highlightRef.current = highlight;
    }
  };

  const renderPdfPage = () => {
    const viewport = page.getViewport({ scale: PDF_SCALE });
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
      if (textLayerRef.current) {
        renderPdfText(viewport);
      }
    });
  };

  useEffect(() => {
    if (!page) return;

    initializeHighlightContainer();
    renderPdfPage();
  }, []);

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

  return (
    <PdfPageContainer>
      <canvas ref={canvasRef} />
      <PdfPageTextLayer ref={textLayerRef} />
      <PdfPageHighlightContainer ref={highlightContainerRef} />
    </PdfPageContainer>
  );
});

export default PdfPage;
