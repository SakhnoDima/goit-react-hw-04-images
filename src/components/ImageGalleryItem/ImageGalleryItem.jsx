import { PropTypes } from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ onClick, src, alt }) => {
  const handleOnclick = event => {
    return onClick(event.target.src);
  };

  return (
    <>
      <li onClick={handleOnclick} className="ImageGalleryItem-item">
        <img src={src} alt={alt} className="ImageGalleryItem-image " />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
