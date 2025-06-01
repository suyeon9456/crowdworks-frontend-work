import TextContent from './TextContent';
import GroupContent from './GroupContent';
import { Text } from '../../types/json';

interface GroupData {
  groupRef: string;
  children: Text[];
}

interface ContentRendererProps {
  content: {
    type: 'group' | 'text';
    data: Text | GroupData;
  };
}

export const ContentRenderer = ({ content }: ContentRendererProps) => {
  if (content.type === 'group') {
    const groupData = content.data as GroupData;
    return <GroupContent groupChildren={groupData.children} />;
  }
  return <TextContent text={content.data as Text} />;
};
