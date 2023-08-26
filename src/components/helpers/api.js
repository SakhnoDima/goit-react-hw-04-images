import axios from 'axios';

const KEY = '38565810-29740f5778639307be3f3659c';
const instance = axios.create({
  params: {
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    key: KEY,
  },
  baseURL: 'https://pixabay.com/api',
});
//! для прикладу
// axios.defaults.baseURL = 'https://pixabay.com/api';
// axios.defaults.params = {
//   key: '38565810-29740f5778639307be3f3659c',
//   per_page: 12,
//   image_type: 'photo',
//   orientation: 'horizontal',
// };

export const fetchArticlesWithQuery = async (searchQuery, page) => {
  const response = await instance.get(`/?q=${searchQuery}&page=${page}`);

  return response.data;
};
