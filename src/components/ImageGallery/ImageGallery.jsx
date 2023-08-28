import React from 'react';
import { PropTypes } from 'prop-types';
import './ImageGallery.css';
import { ImageGalleryItem } from 'components';

export const ImageGallery = ({ pictureList, onClick }) => {
  if (!pictureList) {
    return;
  }
  return (
    <ul className="ImageGallery">
      {pictureList?.map(el => (
        <ImageGalleryItem
          key={el.id}
          onClick={onClick}
          pictureList={pictureList}
          src={el.webformatURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictureList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
