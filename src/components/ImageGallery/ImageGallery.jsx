import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/getImages';
import { ColorRing } from 'react-loader-spinner';
import css from './ImageGallery.module.css';
import { LoadMore } from 'components/LoadMore/LoadMore';
export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: '',
    page: 1,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ page: 1 });
      this.loadImages(this.props.searchQuery, 1);
    }
  }

  onLoadMoreClick = () => {
    const newPage = this.state.page + 1;
    this.setState(prevState => {
      return { page: newPage };
    });
    this.loadImages(this.props.searchQuery, newPage);
  };

  loadImages = (searchQuery, page) => {
    this.setState({ loading: true });
    getImages(searchQuery, page)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.message);
      })
      .then(data => {
        this.setState(prevState => {
          const newImages =
            page === 1
              ? data.hits
              : [...(prevState.images || []), ...data.hits];

          return { images: newImages, total: data.total };
        });
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  
  render() {
    const { loading, images, error } = this.state;
    return (
      <>
        {error}
        {loading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: '0 auto' }}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        <ul className={css.gallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
              />
            ))}
        </ul>
        {images && images.length !== 0 && images.length !== this.state.total && <LoadMore onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  state: PropTypes.shape({
    images: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }),
};
