import { Text } from '../../../types/json';
import React from 'react';
import { GroupBlock, StyledTextBlock } from '../styles';

interface Props {
  data: Text[];
  selectedText: string | null;
  onSelect: (text: string) => void;
}

const GroupContent = React.memo(({ data, selectedText, onSelect }: Props) => {
  return (
    <GroupBlock>
      {data.map((child) => (
        <StyledTextBlock
          key={child.self_ref}
          id={`json-text-${child.text}`}
          isSelected={child.text === selectedText}
          label={child.label}
          onClick={() => onSelect(child.text)}
        >
          {child.text}
        </StyledTextBlock>
      ))}
    </GroupBlock>
  );
});

export default GroupContent;
