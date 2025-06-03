import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import PdfPage from './PdfPage';
import { PdfViewerContainer } from './styles';

const PdfViewer = ({ pdfData }: { pdfData: PDFPageProxy | null }) => {
  if (pdfData === null) return <></>;
  return (
    <PdfViewerContainer>
      <PdfPage page={pdfData} />
    </PdfViewerContainer>
  );
};

export default PdfViewer;
