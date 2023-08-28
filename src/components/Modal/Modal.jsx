import { useEffect } from 'react';
import './Modal.css';
import { PropTypes } from 'prop-types';

export const Modal = ({ onClick, icon }) => {
  //еффект будет выполняться на каждом рендере компонента
  useEffect(() => {
    // закрив по Escspe
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  // закрив по бекдроп
  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackDropClick}>
      MODAL
      <div className="Modal">
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
