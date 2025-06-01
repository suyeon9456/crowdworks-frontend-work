import { JsonData, Text } from '../../types/json';
import { ContentRenderer } from './ContentRenderer';

interface GroupData {
  groupRef: string;
  children: Text[];
}

interface Props {
  jsonData: JsonData | null;
  groupedContent: { type: 'group' | 'text'; data: Text | GroupData }[];
}

const JsonTextBlockViewer = ({ jsonData, groupedContent }: Props) => {
  if (jsonData == null) return <></>;
  return (
    <main style={{ textAlign: 'left', position: 'relative' }}>
      {groupedContent.map((content, index) => (
        <ContentRenderer key={index} content={content} />
      ))}
    </main>
  );
};

export default JsonTextBlockViewer;
