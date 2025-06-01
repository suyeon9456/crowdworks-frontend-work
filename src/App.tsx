import './App.css';
import PdfUrlViewer from './components/pdf/PdfUrlViewer';
import * as pdfjs from 'pdfjs-dist';
import { useJsonData } from './hooks/useJsonData';
import { useGroupedContent } from './hooks/useGroupedContent';
import JsonTextBlockViewer from './components/json/JsonTextBlockViewer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const { jsonData, elementRegistry } = useJsonData();
  const groupedContent = useGroupedContent(jsonData, elementRegistry);

  return (
    <div style={{ display: 'flex' }}>
      <PdfUrlViewer />
      <JsonTextBlockViewer jsonData={jsonData} groupedContent={groupedContent} />
    </div>
  );
}

export default App;
