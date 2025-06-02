import { JsonData, Text, Table } from '../../../types/json';
import GroupContent from './blocks/JsonGroupBlock';
import { JsonViewerContainer } from './styles';
import TableContent from './blocks/JsonTableBlock';
import TextContent from './blocks/JsonTextBlock';
import { useEffect } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import { usePdfJsonSelection } from '../../../contexts/PdfJsonContext';

interface GroupData {
  groupRef: string;
  children: Text[];
}

type ContentType = 'group' | 'text' | 'table';
type ContentData = Text | GroupData | Table;

interface Props {
  jsonData: JsonData | null;
  groupedContent: {
    type: ContentType;
    data: ContentData;
  }[];
}

const JsonTextBlockViewer = ({ jsonData, groupedContent }: Props) => {
  const { selectedText, selectedType, onChangeSelectedJsonText } = usePdfJsonSelection();
  const { containerRef, handleScroll } = useScroll();

  useEffect(() => {
    if (!selectedText || selectedType === 'json') return;
    handleScroll(selectedText);
  }, [selectedText, selectedType]);

  if (jsonData == null) return <></>;

  return (
    <JsonViewerContainer style={{ textAlign: 'left', position: 'relative' }} ref={containerRef}>
      {groupedContent.map((content, index) => {
        const commonProps = { selectedText, onSelect: onChangeSelectedJsonText };
        return (
          <div key={index}>
            {content.type === 'group' && Array.isArray(content.data.children) && (
              <GroupContent data={content.data.children as Text[]} {...commonProps} />
            )}
            {content.type === 'table' && (
              <TableContent data={content.data as Table} {...commonProps} />
            )}
            {content.type === 'text' && (
              <TextContent data={content.data as Text} {...commonProps} />
            )}
          </div>
        );
      })}
    </JsonViewerContainer>
  );
};

export default JsonTextBlockViewer;
