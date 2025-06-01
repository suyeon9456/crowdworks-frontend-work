import { usePdfJson } from '../../contexts/PdfJsonContext';
import { TextItem as TextItemType } from '../../types/json';

interface Props {
  text: TextItemType;
}

const TextContent = ({ text }: Props) => {
  const { selectedId, setSelectedId } = usePdfJson();

  return (
    <p
      style={{
        backgroundColor: selectedId === text.text ? 'yellow' : 'transparent',
      }}
      id={`json-text-${text.text}`}
      onClick={() => {
        setSelectedId(text.text);
      }}
    >
      {text.text}
    </p>
  );
};

export default TextContent;
