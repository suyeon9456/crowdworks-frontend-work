import TextContent from './TextContent';
import GroupContent from './GroupContent';
import TableContent from './TableContent';
import PictureContent from './PictureContent';
import { Text, Table, Picture } from '../../types/json';

interface GroupData {
  groupRef: string;
  children: Text[];
}

interface ContentRendererProps {
  content: {
    type: 'group' | 'text' | 'table' | 'picture';
    data: Text | GroupData | Table | Picture;
  };
}

export const ContentRenderer = ({ content }: ContentRendererProps) => {
  if (content.type === 'group') {
    const groupData = content.data as GroupData;
    return <GroupContent groupChildren={groupData.children} />;
  }
  if (content.type === 'table') {
    const tableData = content.data as Table;
    return <TableContent table={tableData} />;
  }
  if (content.type === 'picture') {
    const pictureData = content.data as Picture;
    return <PictureContent picture={pictureData} />;
  }
  return <TextContent text={content.data as Text} />;
};
