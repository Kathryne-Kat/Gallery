'use strict'
import { PixabayAPI } from "./pixabay-api";
import axios from 'axios';
import { createGalleryCards } from "./createGalleryCards";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(axios);

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    searchBtnEl: document.querySelector('.btn-search'),
}
//console.log(refs.searchBtnEl);

const pixabayAPI = new PixabayAPI();

pixabayAPI.fetchDifferentPhotos().then(({ data }) => {
    console.log(data);
    refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
}).catch(err => {
    console.log(err);
})

const onSearchSubmit = e => {
    e.preventDefault();

    refs.searchBtnEl.disabled = true;
    //console.log(refs.searchBtnEl);
    //refs.searchBtnEl.setAttribute('disabled','')

    pixabayAPI.query = e.target.elements.searchQuery.value;
    pixabayAPI.page = 1;
    
    pixabayAPI
        .fetchPhotos()
    .then(({data}) => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                //alert('Нічого не знайдено')
                e.target.reset();
                refs.galleryListEl.innerHTML = '';
                refs.loadMoreBtnEl.classList.add('is-hidden');
                return;
            }
            if (data.totalHits > 40) {
                console.log(data.total);
                refs.loadMoreBtnEl.classList.remove('is-hidden')
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            }
            console.log(data);
            refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
            const lightbox = new SimpleLightbox('.gallery a'); 
        })
        .catch(err => {
        console.log(err);
        })
        .finally(() => {
            refs.searchBtnEl.disabled = false;
        })    
};



const onLoadMoreClick = e => {
    e.target.disabled = true;
    pixabayAPI.page += 1;
    pixabayAPI.fetchPhotos().then(({data}) => {
        //data.hits.refresh();
        refs.galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        //data.refresh();
         const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
        const totalPage = Math.ceil(data.totalHits / 40);
        //console.log(totalPage);
            if (totalPage === pixabayAPI.page) {
                refs.loadMoreBtnEl.classList.add('is-hidden');
                Notiflix.Notify.info(`Were sorry, but you've reached the end of search results.`);
            }
    })
        .catch(err => {
        console.log(err);
        })
        .finally(() => {
            e.target.disabled = false;
        })
}

refs.searchFormEl.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);