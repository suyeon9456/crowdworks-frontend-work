import { Text } from '@/types/json';
import React from 'react';
import { StyledTextBlock } from '@/components/features/json-viewer/styles';
import { compareJsonToPdfStrings } from '@/utils/string';
import { generateJsonId } from '@/utils/id';
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
      id={generateJsonId(data.text)}
      onClick={() => onSelect(data.text)}
    >
      {data.text}
    </StyledTextBlock>
  );
});

export default TextContent;
