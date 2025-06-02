import { usePdfJsonSelection } from '../../contexts/PdfJsonContext';
import { Text } from '../../types/json';
import { StyledTextBlock, GroupBlock } from './styles';

interface Props {
  groupChildren: Text[];
}

const GroupContent = ({ groupChildren }: Props) => {
  const { selectedId, setSelectedId } = usePdfJsonSelection();
  return (
    <GroupBlock>
      {groupChildren.map((child) => (
        <StyledTextBlock
          key={child.self_ref}
          isSelected={selectedId === child.text}
          label={child.label}
          onClick={() => {
            setSelectedId(child.text);
          }}
        >
          {child.text}
        </StyledTextBlock>
      ))}
    </GroupBlock>
  );
};

export default GroupContent;
