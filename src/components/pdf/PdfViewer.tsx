import { useCallback, useEffect, useState } from 'react';
import PdfPage from './PdfPage';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';

interface Props {
  getPdfPage: (index: number) => Promise<PDFPageProxy>;
  page: PDFPageProxy;
}

const PdfViewer = ({ getPdfPage, page }: Props) => {
  const style = {
    border: '1px solid #ccc',
    background: '#ddd',
  };

  const [pages, setPages] = useState<PDFPageProxy[]>([]);

  const fetchPage = useCallback(
    async (index: number) => {
      if (!pages[index]) {
        const page = await getPdfPage(index);
        setPages((prev) => {
          const next = [...prev];
          next[index] = page;
          return next;
        });
      }
    },
    [getPdfPage, pages],
  );

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage, page]);

  return (
    <div style={style}>
      <PdfPage page={pages[0]} scale={1.0} />
    </div>
  );
};

export default PdfViewer;
