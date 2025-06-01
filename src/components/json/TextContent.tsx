import { usePdfJson } from '../../contexts/PdfJsonContext';
import { Text } from '../../types/json';
import { StyledTextBlock } from './styles';

interface Props {
  text: Text;
}

const TextContent = ({ text }: Props) => {
  const { selectedId, setSelectedId } = usePdfJson();

  return (
    <StyledTextBlock
      isSelected={selectedId === text.text}
      label={text.label}
      id={`json-text-${text.text}`}
      onClick={() => {
        setSelectedId(text.text);
      }}
    >
      {text.text}
    </StyledTextBlock>
  );
};

export default TextContent;
