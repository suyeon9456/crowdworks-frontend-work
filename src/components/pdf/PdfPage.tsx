import React, { useRef, useEffect, useMemo } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { PdfPageContainer, PdfPageTextLayer } from './styles';
import { usePdfJson } from '../../contexts/PdfJsonContext';

interface Props {
  scale: number;
  page: PDFPageProxy;
}

const PdfPage = React.memo(({ scale, page }: Props) => {
  const { selectedId, setSelectedId } = usePdfJson();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const highlightStyle = useMemo(
    () => `
    .highlight {
      position: absolute;
      background-color: rgba(24, 144, 255, 0.1);
      border: 2px solid rgba(9, 109, 217);
      pointer-events: none;
      display: none;
    }
  `,
    [],
  );

  useEffect(() => {
    if (!page) return;

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

    const viewport = page.getViewport({ scale });

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      const renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });

      page.getTextContent().then((textContent) => {
        if (!textLayerRef.current) return;

        textLayerRef.current.style.setProperty('--scale-factor', scale.toString());

        const groupedItems = textContent.items.reduce((acc: any[], item: any) => {
          if (item.str === '') return acc;
          return [...acc, item];
        }, []);

        const textDivs: HTMLDivElement[] = [];
        pdfjs
          .renderTextLayer({
            textContentSource: { ...textContent, items: groupedItems },
            container: textLayerRef.current,
            viewport: viewport,
            textDivs: textDivs,
          })
          .promise.then(() => {
            textDivs.forEach((div, index) => {
              const textItem = groupedItems[index];
              if (textItem && 'str' in textItem) {
                div.id = `pdf-text-${textItem.str}`;
                div.style.cursor = 'pointer';

                div.onmouseenter = () => {
                  setSelectedId(textItem.str);
                };

                div.onmouseleave = () => {
                  setSelectedId(null);
                };
              }
            });
          });
      });
    }
  }, [page, scale, highlightStyle]);

  useEffect(() => {
    if (!shadowRootRef.current || !highlightRef.current) return;

    const highlight = highlightRef.current;
    const textDiv = document.getElementById(`pdf-text-${selectedId}`);

    if (textDiv && selectedId) {
      const rect = textDiv.getBoundingClientRect();
      const containerRect = highlightContainerRef.current?.getBoundingClientRect();

      if (containerRect) {
        highlight.style.left = `${rect.left - containerRect.left}px`;
        highlight.style.top = `${rect.top - containerRect.top}px`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
        highlight.style.display = 'block';
      }
    } else {
      highlight.style.display = 'none';
    }
  }, [selectedId]);

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
