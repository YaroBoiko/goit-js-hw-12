import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter something to search' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    hideLoader();

    if (!data.hits.length) {
      iziToast.error({ message: 'No images found. Try again!' });
      return;
    }

    createGallery(data.hits);
    if (data.totalHits > 15) {
      showLoadMoreButton();
    }
  } catch (err) {
    hideLoader();
    iziToast.error({ message: 'Something went wrong. Try later!' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    const alreadyShown = document.querySelectorAll('.gallery li').length;
    if (alreadyShown >= totalHits) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    hideLoader();
  } catch (err) {
    hideLoader();
    iziToast.error({ message: 'Something went wrong while loading more images.' });
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}