import { TextItem as TextItemType } from '../../types/json';

interface GroupContentProps {
  groupChildren: TextItemType[];
}

const GroupContent = ({ groupChildren }: GroupContentProps) => {
  return (
    <div>
      {groupChildren.map((child) => (
        <p key={child.self_ref}>{child.text}</p>
      ))}
    </div>
  );
};

export default GroupContent;
