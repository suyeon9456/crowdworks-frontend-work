import './App.css';
import PdfViewer from './components/features/pdf-viewer/PdfViewer';
import * as pdfjs from 'pdfjs-dist';
import useJsonData from './hooks/useJsonData';
import useJsonDataParsing from './hooks/useJsonDataParsing';
import { PdfJsonProvider } from './contexts/PdfJsonContext';
import JsonViewer from './components/features/json-viewer/JsonViewer';
import usePdfData from './hooks/usePdfData';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const { pdfData } = usePdfData({ pdfUrl: '/1.report.pdf' });
  const { jsonData } = useJsonData({ jsonUrl: '/1.report.json' });
  const parsedJsonData = useJsonDataParsing(jsonData);

  return (
    <div style={{ display: 'flex' }}>
      <PdfJsonProvider>
        <PdfViewer pdfData={pdfData} />
        <JsonViewer jsonData={jsonData} parsedJsonData={parsedJsonData} />
      </PdfJsonProvider>
    </div>
  );
}

export default App;
