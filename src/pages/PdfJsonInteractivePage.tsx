import JsonRenderer from '@/components/features/json-viewer/JsonRenderer';
import PdfViewer from '@/components/features/pdf-viewer/PdfViewer';
import { PdfJsonProvider } from '@/contexts/PdfJsonContext';
import useJsonData from '@/hooks/useJsonData';
import useJsonDataParsing from '@/hooks/useJsonDataParsing';
import usePdfData from '@/hooks/usePdfData';
import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfJsonInteractivePage = () => {
  const { pdfData } = usePdfData({ pdfUrl: '/1.report.pdf' });
  const { jsonData } = useJsonData({ jsonUrl: '/1.report.json' });
  const parsedJsonData = useJsonDataParsing(jsonData);

  return (
    <div style={{ display: 'flex' }}>
      <PdfJsonProvider>
        <PdfViewer pdfData={pdfData} />
        <JsonRenderer jsonData={jsonData} parsedJsonData={parsedJsonData} />
      </PdfJsonProvider>
    </div>
  );
};

export default PdfJsonInteractivePage;
