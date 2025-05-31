import React, { useRef, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { PdfPageContainer, PdfPageTextLayer } from './styles';

interface Props {
  scale: number;
  page: PDFPageProxy;
}

const PdfPage = React.memo(({ scale, page }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!page) {
      return;
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
        if (!textLayerRef.current) {
          return;
        }

        textLayerRef.current.style.setProperty('--scale-factor', scale.toString());

        pdfjs.renderTextLayer({
          textContentSource: textContent,
          container: textLayerRef.current,
          viewport: viewport,
          textDivs: [],
        });
      });
    }
  }, [page, scale]);

  return (
    <PdfPageContainer>
      <canvas ref={canvasRef} />
      <PdfPageTextLayer ref={textLayerRef} />
    </PdfPageContainer>
  );
});

export default PdfPage;
