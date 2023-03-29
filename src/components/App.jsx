import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleFormSubmit (searchQuery) {
    setSearchQuery(searchQuery);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery searchQuery={searchQuery}></ImageGallery>
    </div>
  );
}

App.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
