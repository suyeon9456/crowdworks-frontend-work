import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type PdfJsonState = {
  selectedType: 'json' | 'pdf';
  selectedText: string | null;
  onChangeSelectedJsonText: (text: string | null) => void;
  onChangeSelectedPdfText: (text: string | null) => void;
};

const PdfJsonContext = createContext<PdfJsonState | undefined>(undefined);

export const PdfJsonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedType, setSelectedType] = useState<'json' | 'pdf'>('json');
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleChangeSelectedJsonId = useCallback((text: string | null) => {
    setSelectedText(text);
    setSelectedType('json');
  }, []);

  const handleChangeSelectedPdfId = useCallback((text: string | null) => {
    setSelectedText(text);
    setSelectedType('pdf');
  }, []);

  return (
    <PdfJsonContext.Provider
      value={{
        selectedType,
        selectedText,
        onChangeSelectedJsonText: handleChangeSelectedJsonId,
        onChangeSelectedPdfText: handleChangeSelectedPdfId,
      }}
    >
      {children}
    </PdfJsonContext.Provider>
  );
};

export const usePdfJsonSelection = () => {
  const ctx = useContext(PdfJsonContext);
  if (!ctx) throw new Error('PdfJsonProvider 하위에서만 호출해야합니다.');
  return ctx;
};
