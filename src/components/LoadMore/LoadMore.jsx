import React from 'react';
import PropTypes from 'prop-types';
import css from './LoadMore.module.css';
export const LoadMore = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load more
    </button>
  );
};

LoadMore.propTypes = {
  onClick: PropTypes.func,
};
