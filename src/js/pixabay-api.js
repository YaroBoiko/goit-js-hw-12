import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42378066-015a1b30c7edae39918794555';


export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  return response.data;
}