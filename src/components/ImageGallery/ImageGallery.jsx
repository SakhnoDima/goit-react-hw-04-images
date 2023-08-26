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
      <ImageGalleryItem onClick={onClick} pictureList={pictureList} />
    </ul>
  );
};

ImageGallery.propTypes = {
  pictureList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
