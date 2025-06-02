import { useEffect, useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import PdfViewer from './PdfViewer';

const PdfUrlViewer = () => {
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const [currentPage, setCurrentPage] = useState<PDFPageProxy | null>(null);

  useEffect(() => {
    var loadingTask = pdfjs.getDocument('/1.report.pdf');
    loadingTask.promise.then(
      (pdf) => {
        pdfRef.current = pdf;

        pdf.getPage(1).then(function (page) {
          setCurrentPage(page);
        });
      },
      (reason) => {
        console.error(reason);
      },
    );
  }, []);

  const handleGetPdfPage = async (index: number): Promise<PDFPageProxy> => {
    if (!pdfRef.current) {
      throw new Error('PDF document not loaded');
    }
    return await pdfRef.current.getPage(index + 1);
  };

  if (!currentPage) return null;

  return <PdfViewer getPdfPage={handleGetPdfPage} page={currentPage} />;
};

export default PdfUrlViewer;
