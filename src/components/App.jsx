import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    searchQuery: PropTypes.string.isRequired,
  }),
};
