import { Picture } from '../../types/json';

interface Props {
  picture: Picture;
}

const PictureContent = ({ picture }: Props) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <img
        src={picture.image.uri}
        alt=""
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
};

export default PictureContent;
