import { Table } from '@/types/json';
import { TableBlock, TableBody, TableCol, TableRow } from '../styles';
import React from 'react';
import { compareJsonToPdfStrings } from '@/utils/string';
import { generateJsonId } from '@/utils/id';
interface Props {
  data: Table;
  selectedText: string | null;
  onSelect: (text: string) => void;
}

const TableContent = React.memo(({ data, selectedText, onSelect }: Props) => {
  return (
    <TableBlock>
      <TableBody>
        {data.data.grid.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCol
                id={generateJsonId(cell.text)}
                key={cellIndex}
                isSelected={compareJsonToPdfStrings(cell.text, selectedText)}
                onClick={() => onSelect(cell.text)}
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
