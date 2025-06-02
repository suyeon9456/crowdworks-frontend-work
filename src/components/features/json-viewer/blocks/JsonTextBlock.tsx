import { Text } from '../../../types/json';
import React from 'react';
import { StyledTextBlock } from '../styles';
import { compareJsonToPdfStrings } from '../../../utils/string';
interface Props {
  data: Text;
  selectedText: string | null;
  onSelect: (text: string) => void;
}

const TextContent = React.memo(({ data, selectedText, onSelect }: Props) => {
  return (
    <StyledTextBlock
      isSelected={compareJsonToPdfStrings(data.text, selectedText)}
      label={data.label}
      id={`json-text-${data.text}`}
      onClick={() => onSelect(data.text)}
    >
      {data.text}
    </StyledTextBlock>
  );
});

export default TextContent;
