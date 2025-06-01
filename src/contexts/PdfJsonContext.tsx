import { createContext, ReactNode, useContext, useState } from 'react';

type PdfJsonState = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PdfJsonContext = createContext<PdfJsonState | undefined>(undefined);

export const PdfJsonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PdfJsonContext.Provider
      value={{
        selectedId,
        setSelectedId,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PdfJsonContext.Provider>
  );
};

export const usePdfJson = () => {
  const ctx = useContext(PdfJsonContext);
  if (!ctx) throw new Error('PdfJsonProvider 하위에서만 호출해야합니다.');
  return ctx;
};
