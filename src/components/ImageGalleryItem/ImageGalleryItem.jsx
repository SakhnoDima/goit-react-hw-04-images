import { PropTypes } from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ pictureList, onClick }) => {
  const handleOnclick = event => {
    return onClick(event.target.src);
  };

  return (
    <>
      {pictureList?.map(el => (
        <li
          onClick={handleOnclick}
          key={el.id}
          className="ImageGalleryItem-item"
        >
          <img
            src={el.webformatURL}
            alt={el.tags}
            className="ImageGalleryItem-image "
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  pictureList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
