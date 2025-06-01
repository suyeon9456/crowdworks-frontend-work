import { Table } from '../../types/json';

interface Props {
  table: Table;
}

const TableContent = ({ table }: Props) => {
  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%', margin: '1rem 0' }}>
        <tbody>
          {table.data.grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  {cell.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
