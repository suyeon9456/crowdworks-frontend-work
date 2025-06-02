import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Table } from '../../types/json';
import { TableBlock, TableBody, TableCol, TableRow } from './styles';
interface Props {
  table: Table;
}

const TableContent = ({ table }: Props) => {
  const { selectedId, setSelectedId } = usePdfJsonSelection();
  return (
    <TableBlock>
      <TableBody>
        {table.data.grid.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCol
                id={`table-cell-${cell.text}`}
                key={cellIndex}
                isSelected={selectedId === cell.text}
                onClick={() => {
                  setSelectedId(cell.text);
                }}
              >
                {cell.text}
              </TableCol>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableBlock>
  );
};

export default TableContent;
