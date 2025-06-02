import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Text } from '../../types/json';
import { StyledTextBlock } from './styles';
import React from 'react';

interface Props {
  text: Text;
}

const TextContent = React.memo(({ text }: Props) => {
  const { selectedText, onChangeSelectedJsonText } = usePdfJsonSelection();

  return (
    <StyledTextBlock
      isSelected={selectedText === text.text}
      label={text.label}
      id={`json-text-${text.text}`}
      onClick={() => onChangeSelectedJsonText(text.text)}
    >
      {text.text}
    </StyledTextBlock>
  );
});

export default TextContent;
