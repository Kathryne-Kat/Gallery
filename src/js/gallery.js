'use strict'
import { PixabayAPI } from "./pixabay-api";
import axios from 'axios';
import { createGalleryCards } from "./createGalleryCards";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    searchBtnEl: document.querySelector('.btn-search'),    
}
const { height: cardHeight } = document.querySelector(".gallery");


const pixabayAPI = new PixabayAPI();

const appendRandomPhotos = async () => {
    try {
        const { data } = await pixabayAPI.fetchRandomPhotos();
        //console.log(data);
        refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
        const lightbox = new SimpleLightbox('.gallery a'); 
    } catch (err) {
        console.log(err);
    }
};

appendRandomPhotos();

const onSearchSubmit = async e => {
    e.preventDefault();

    pixabayAPI.query = e.target.elements.searchQuery.value;
    pixabayAPI.page = 1;
    
    try { 
        const {data} = await pixabayAPI.fetchPhotos();
        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            //alert('Нічого не знайдено')
            e.target.reset();
            refs.galleryListEl.innerHTML = '';
            refs.loadMoreBtnEl.classList.add('is-hidden');            
            return;
        }
        if (data.totalHits > 40) {            
            refs.loadMoreBtnEl.classList.remove('is-hidden')
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
            
        refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
        
        const lightbox = new SimpleLightbox('.gallery a');    
    } catch (err) {
        console.log(err);
    }   
};

const onLoadMoreClick =async e => {
    e.target.disabled = true;
    e.target.classList.add('disabled');

    pixabayAPI.page += 1;
    try {
        const { data } = await pixabayAPI.fetchPhotos();        
        refs.galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();

        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
        
        const totalPage = Math.ceil(data.totalHits / 40);
        
        if (totalPage === pixabayAPI.page) {
            refs.loadMoreBtnEl.classList.add('is-hidden');
            Notiflix.Notify.info(`Were sorry, but you've reached the end of search results.`);
        }
    }
    catch(err) {
        console.log(err);
    };        
    e.target.disabled = false;
    e.target.classList.remove('disabled');
};

refs.searchFormEl.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);