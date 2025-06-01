import { JsonData, Text, Table, Picture } from '../../types/json';
import GroupContent from './GroupContent';
import { JsonViewer } from './styles';
import TableContent from './TableContent';
import TextContent from './TextContent';
import React from 'react';

interface GroupData {
  groupRef: string;
  children: Text[];
}

type ContentType = 'group' | 'text' | 'table';
type ContentData = Text | GroupData | Table | Picture;

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
  if (jsonData == null) return <></>;
  return (
    <JsonViewer style={{ textAlign: 'left', position: 'relative' }}>
      {groupedContent.map((content, index) => (
        <div key={index}>{ContentMapper[content.type](content.data)}</div>
      ))}
    </JsonViewer>
  );
};

export default JsonTextBlockViewer;
