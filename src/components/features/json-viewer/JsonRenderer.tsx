import { Text, Table } from '@/types/json';
import GroupContent from './blocks/JsonGroupBlock';
import { JsonViewerContainer } from './styles';
import TableContent from './blocks/JsonTableBlock';
import TextContent from './blocks/JsonTextBlock';
import { useEffect } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { usePdfJsonSelection } from '@/contexts/PdfJsonContext';

interface GroupData {
  groupRef: string;
  children: Text[];
}

type Content =
  | { type: 'group'; data: GroupData; selfRef: string }
  | { type: 'text'; data: Text; selfRef: string }
  | { type: 'table'; data: Table; selfRef: string };

interface Props {
  parsedJsonData: Content[];
}

const JsonRenderer = ({ parsedJsonData }: Props) => {
  const { selectedText, selectedType, onChangeSelectedJsonText } = usePdfJsonSelection();
  const { containerRef, handleScroll } = useScroll();

  useEffect(() => {
    if (!selectedText || selectedType === 'json') return;
    handleScroll(selectedText);
  }, [selectedText, selectedType]);

  if (parsedJsonData == null) return <></>;

  return (
    <JsonViewerContainer ref={containerRef}>
      {parsedJsonData.map((content, index) => {
        const commonProps = { selectedText, onSelect: onChangeSelectedJsonText };
        return (
          <div key={index}>
            {content.type === 'group' && (
              <GroupContent data={content.data.children} {...commonProps} />
            )}
            {content.type === 'table' && <TableContent data={content.data} {...commonProps} />}
            {content.type === 'text' && <TextContent data={content.data} {...commonProps} />}
          </div>
        );
      })}
    </JsonViewerContainer>
  );
};

export default JsonRenderer;
