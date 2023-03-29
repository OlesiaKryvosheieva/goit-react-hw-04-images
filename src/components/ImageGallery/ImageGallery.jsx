import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/getImages';
import { ColorRing } from 'react-loader-spinner';
import css from './ImageGallery.module.css';
import { LoadMore } from 'components/LoadMore/LoadMore';
export function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    // function loadImages(searchQuery, page) {
    //   setLoading(true);
    //   getImages(searchQuery, page)
    //     .then(response => {
    //       if (response.status === 200) {
    //         return response.json();
    //       } else throw Error(response.message);
    //     })
    //     .then(data => {
    //       setImages(() => {
    //         const newImages =
    //           page === 1 ? data.hits : [...(images || []), ...data.hits];

    //         return setImages(newImages), setTotal(data.total);
    //       });
    //     })
    //     .catch(error => setError(error.message))
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
    console.log(typeof searchQuery);
    setPage(1);

    loadImages(searchQuery, 1);
  }, [searchQuery, loadImages]);
  // componentDidUpdate(prevProps, prevState) {
  //   if (searchQuery !== prevProps.searchQuery) {
  //     this.setState({ page: 1 });
  //     this.loadImages(searchQuery, 1);
  //   }
  // }

  function onLoadMoreClick(loadImages) {
    const newPage = page + 1;
    setPage(newPage);
    loadImages(searchQuery, newPage);
  }

  function loadImages(searchQuery, page) {
    setLoading(true);
    getImages(searchQuery, page)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else throw Error(response.message);
      })
      .then(data => {
        setImages(() => {
          const newImages =
            page === 1 ? data.hits : [...(images || []), ...data.hits];

          return setImages(newImages), setTotal(data.total);
        });
      })
      .catch(error => setError(error.message))
      .finally(() => {
        setLoading(false);
      });
  }

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
      {images && images.length !== 0 && images.length !== total && (
        <LoadMore onClick={onLoadMoreClick} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  images: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
