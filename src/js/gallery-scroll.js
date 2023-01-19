'use strict'
import { PixabayAPI } from "./pixabay-api";
import { createGalleryCards } from "./createGalleryCards";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    searchBtnEl: document.querySelector('.btn-search'),
    targetEl:document.querySelector('.target-element'),
}

refs.loadMoreBtnEl.classList.add('is-hidden'); 

const pixabayAPI = new PixabayAPI();



const appendRandomPhotos = async () => {
    try {
        const { data } = await pixabayAPI.fetchRandomPhotos();
        
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
            return;
        }
        if (data.totalHits > 40) {            
            
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
            
        refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
        
        const lightbox = new SimpleLightbox('.gallery a');
        //lightbox.refresh();

        setTimeout(() => {
            observer.observe(refs.targetEl);
        }, 100);
    } catch (err) {
        console.log(err);
    }   
};

const observer = new IntersectionObserver(
    async (entries, observer) => {
        if (!entries[0].isIntersecting) {
            return;
        }

        pixabayAPI.page += 1;

        try {            
            const { data } = await pixabayAPI.fetchPhotos();
            refs.galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        
            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();          
        
            const totalPage = Math.ceil(data.totalHits / 40);
        
            if (totalPage === pixabayAPI.page) {
                observer.unobserve(targetEl);
                Notiflix.Notify.info(`Were sorry, but you've reached the end of search results.`);
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 1.0,
    }
);

refs.searchFormEl.addEventListener('submit', onSearchSubmit);
