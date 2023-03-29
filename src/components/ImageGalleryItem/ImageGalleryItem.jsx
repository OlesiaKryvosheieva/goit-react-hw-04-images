import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <li className={css.item} onClick={toggleModal}>
        <img src={webformatURL} alt="" className={css.itemImage} />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          {<img src={largeImageURL} alt="" width="800px" />}
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
