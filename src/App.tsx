import './App.css';
import PdfUrlViewer from './components/pdf/PdfUrlViewer';
import * as pdfjs from 'pdfjs-dist';
import { useJsonData } from './hooks/useJsonData';
import { useGroupedContent } from './hooks/useGroupedContent';
import JsonViewer from './components/json/JsonViewer';
import { PdfJsonProvider } from './contexts/PdfJsonContext';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const { jsonData, elementRegistry } = useJsonData();
  const groupedContent = useGroupedContent(jsonData, elementRegistry);

  return (
    <div style={{ display: 'flex' }}>
      <PdfJsonProvider>
        <PdfUrlViewer />
        <JsonViewer jsonData={jsonData} groupedContent={groupedContent} />
      </PdfJsonProvider>
    </div>
  );
}

export default App;
