import './App.css';
import PdfUrlViewer from './components/features/pdf-viewer/PdfUrlViewer';
import * as pdfjs from 'pdfjs-dist';
import { useJsonData } from './hooks/useJsonData';
import { useGroupedContent } from './hooks/useGroupedContent';
import { PdfJsonProvider } from './contexts/PdfJsonContext';
import JsonViewer from './components/features/json-viewer/JsonViewer';
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
