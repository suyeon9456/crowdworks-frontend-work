import { createContext, ReactNode, useContext, useState } from 'react';

type PdfJsonState = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

const PdfJsonContext = createContext<PdfJsonState | undefined>(undefined);

export const PdfJsonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <PdfJsonContext.Provider
      value={{
        selectedId,
        setSelectedId,
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
