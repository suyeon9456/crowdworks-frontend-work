import './App.css';
import PdfUrlViewer from './components/pdf/PdfUrlViewer';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  return (
    <>
      <PdfUrlViewer />
    </>
  );
}

export default App;
