import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { PropTypes } from 'prop-types';

export const Loader = ({ visible }) => {
  return (
    <div className="Spinner">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="36"
        visible={visible}
      />
    </div>
  );
};

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
