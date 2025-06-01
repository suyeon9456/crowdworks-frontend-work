import { JsonData, Text, Table, Picture } from '../../types/json';
import { ContentRenderer } from './ContentRenderer';

interface GroupData {
  groupRef: string;
  children: Text[];
}

interface Props {
  jsonData: JsonData | null;
  groupedContent: {
    type: 'group' | 'text' | 'table' | 'picture';
    data: Text | GroupData | Table | Picture;
  }[];
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
