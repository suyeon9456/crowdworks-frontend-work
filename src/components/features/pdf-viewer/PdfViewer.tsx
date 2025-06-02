import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import PdfPage from './PdfPage';
import { PdfViewerContainer } from './styles';

const PdfViewer = ({ pdfData }: { pdfData: PDFPageProxy | null }) => {
  // const pdfRef = useRef<PDFDocumentProxy | null>(null);

  // const [currentPage, setCurrentPage] = useState<PDFPageProxy | null>(null);

  // useEffect(() => {
  //   var loadingTask = pdfjs.getDocument('/1.report.pdf');
  //   loadingTask.promise.then(
  //     (pdf) => {
  //       pdfRef.current = pdf;

  //       pdf.getPage(1).then(function (page) {
  //         setCurrentPage(page);
  //       });
  //     },
  //     (reason) => {
  //       console.error(reason);
  //     },
  //   );
  // }, []);

  // const handleGetPdfPage = async (index: number): Promise<PDFPageProxy> => {
  //   if (!pdfRef.current) {
  //     throw new Error('PDF document not loaded');
  //   }
  //   return await pdfRef.current.getPage(index + 1);
  // };

  if (pdfData === null) return <></>;

  return (
    <PdfViewerContainer>
      <PdfPage page={pdfData} scale={1.0} />
    </PdfViewerContainer>
  );
};

export default PdfViewer;
