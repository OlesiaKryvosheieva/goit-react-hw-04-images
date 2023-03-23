const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33416863-96243ffb58b5be25ce0deadef';
export const getImages = (searchQuery, page) => {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
