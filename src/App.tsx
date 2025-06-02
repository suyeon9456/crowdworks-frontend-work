import './App.css';
import PdfViewer from './components/features/pdf-viewer/PdfViewer';
import * as pdfjs from 'pdfjs-dist';
import { useJsonData } from './hooks/useJsonData';
import { useGroupedContent } from './hooks/useGroupedContent';
import { PdfJsonProvider } from './contexts/PdfJsonContext';
import JsonViewer from './components/features/json-viewer/JsonViewer';
import usePdfData from './hooks/usePdfData';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const { pdfData } = usePdfData({ pdfUrl: '/1.report.pdf' });
  console.log('🚀 ~ App ~ pdfData:', pdfData);
  const { jsonData, elementRegistry } = useJsonData();
  const groupedContent = useGroupedContent(jsonData, elementRegistry);

  return (
    <div style={{ display: 'flex' }}>
      <PdfJsonProvider>
        <PdfViewer pdfData={pdfData} />
        <JsonViewer jsonData={jsonData} groupedContent={groupedContent} />
      </PdfJsonProvider>
    </div>
  );
}

export default App;
