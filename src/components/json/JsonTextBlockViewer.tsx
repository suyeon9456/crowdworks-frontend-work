import { JsonData, Text, Table } from '../../types/json';
import GroupContent from './GroupContent';
import { JsonViewer } from './styles';
import TableContent from './TableContent';
import TextContent from './TextContent';
import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import React, { useEffect } from 'react';
import { useScroll } from '../../hooks/useScroll';

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

const ContentMapper: Record<ContentType, (data: ContentData) => React.ReactElement> = {
  group: (data) => <GroupContent groupChildren={(data as GroupData).children} />,
  table: (data) => <TableContent table={data as Table} />,
  text: (data) => <TextContent text={data as Text} />,
} as const;

const JsonTextBlockViewer = ({ jsonData, groupedContent }: Props) => {
  const { selectedId } = usePdfJsonSelection();
  const { containerRef, handleScroll } = useScroll();

  useEffect(() => {
    if (!selectedId) return;
    handleScroll(selectedId);
  }, [selectedId, handleScroll]);

  if (jsonData == null) return <></>;
  return (
    <JsonViewer style={{ textAlign: 'left', position: 'relative' }} ref={containerRef}>
      {groupedContent.map((content, index) => (
        <div key={index}>{ContentMapper[content.type](content.data)}</div>
      ))}
    </JsonViewer>
  );
};

export default JsonTextBlockViewer;
