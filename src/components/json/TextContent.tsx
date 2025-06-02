import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Text } from '../../types/json';
import { StyledTextBlock } from './styles';
import React from 'react';

interface Props {
  text: Text;
}

const TextContent = React.memo(({ text }: Props) => {
  const { selectedId, setSelectedId } = usePdfJsonSelection();

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
});

export default TextContent;
