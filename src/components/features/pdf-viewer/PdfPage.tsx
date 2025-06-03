import React, { useRef, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFPageProxy, TextItem } from 'pdfjs-dist/types/src/display/api';
import { PdfPageContainer, PdfPageTextLayer } from './styles';
import { usePdfJsonSelection } from '@/contexts/PdfJsonContext';
import { PDF_SCALE } from '@/commons/pdf';
import { getTextItems } from '@/utils/pdf';
import Highlight from './Highlight';
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
  const highlightRef = useRef<{ init: () => void }>(null);

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
    if (!page || !highlightRef.current) return;

    renderPdfPage();
    highlightRef.current.init();
  }, []);

  return (
    <PdfPageContainer>
      <canvas ref={canvasRef} />
      <PdfPageTextLayer ref={textLayerRef} />
      <Highlight ref={highlightRef} selectedText={selectedText} />
    </PdfPageContainer>
  );
});

export default PdfPage;
