import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        <li className={css.item} onClick={this.toggleModal}>
          <img src={this.props.webformatURL} alt="" className={css.itemImage} />
        </li>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            {<img src={this.props.largeImageURL} alt="" width="800px" />}
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};
