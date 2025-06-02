import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Text } from '../../types/json';
import { compareJsonToPdfStrings } from '../../utils/string';
import { StyledTextBlock, GroupBlock } from './styles';
import React from 'react';
interface Props {
  groupChildren: Text[];
}

const GroupContent = React.memo(({ groupChildren }: Props) => {
  const { selectedText, onChangeSelectedJsonText } = usePdfJsonSelection();
  return (
    <GroupBlock>
      {groupChildren.map((child) => (
        <StyledTextBlock
          key={child.self_ref}
          id={`json-text-${child.text}`}
          isSelected={compareJsonToPdfStrings(child.text, selectedText)}
          label={child.label}
          onClick={() => onChangeSelectedJsonText(child.text)}
        >
          {child.text}
        </StyledTextBlock>
      ))}
    </GroupBlock>
  );
});

export default GroupContent;
