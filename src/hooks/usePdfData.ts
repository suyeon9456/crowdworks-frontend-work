import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  pdfUrl: string;
}

const usePdfData = ({ pdfUrl }: Props) => {
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [currentPdfPage, setCurrentPdfPage] = useState<PDFPageProxy | null>(null);

  const getPdfPage = useCallback(
    async (pageNumber: number) => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      pdfRef.current = pdf;
      const page = await pdf.getPage(pageNumber);
      setCurrentPdfPage(page);
    },
    [pdfUrl],
  );

  useEffect(() => {
    getPdfPage(1);
  }, []);

  return { getPdfPage, pdfData: currentPdfPage };
};

export default usePdfData;
