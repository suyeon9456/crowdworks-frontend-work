import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Table } from '../../types/json';
import { compareJsonToPdfStrings } from '../../utils/string';
import { TableBlock, TableBody, TableCol, TableRow } from './styles';
import React from 'react';
interface Props {
  table: Table;
}

const TableContent = React.memo(({ table }: Props) => {
  const { selectedText, onChangeSelectedJsonText } = usePdfJsonSelection();
  return (
    <TableBlock>
      <TableBody>
        {table.data.grid.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCol
                id={`json-text-${cell.text}`}
                key={cellIndex}
                isSelected={compareJsonToPdfStrings(cell.text, selectedText)}
                onClick={() => onChangeSelectedJsonText(cell.text)}
              >
                {cell.text}
              </TableCol>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableBlock>
  );
});

export default TableContent;
