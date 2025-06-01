import { TextItem as TextItemType } from '../../types/json';

interface Props {
  text: TextItemType;
}

const TextContent = ({ text }: Props) => {
  return (
    <div>
      <p>{text.text}</p>
    </div>
  );
};

export default TextContent;
