import { Text } from '../../types/json';
import { StyledTextBlock } from './styles';
import React from 'react';

interface Props {
  data: Text;
  selectedText: string | null;
  onSelect: (text: string) => void;
}

const TextContent = React.memo(({ data, selectedText, onSelect }: Props) => {
  return (
    <StyledTextBlock
      isSelected={selectedText === data.text}
      label={data.label}
      id={`json-text-${data.text}`}
      onClick={() => onSelect(data.text)}
    >
      {data.text}
    </StyledTextBlock>
  );
});

export default TextContent;
