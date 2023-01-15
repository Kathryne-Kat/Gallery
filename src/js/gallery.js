'use strict'
import { PixabayAPI } from "./pixabay-api";
import { createGalleryCards } from "./createGalleryCards";

const pixabayAPI = new PixabayAPI();

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryListEl:document.querySelector('.gallery')
}
//console.log(refs.galleryListEl);
const onSearchSubmit = e => {
    e.preventDefault();
    pixabayAPI.query = e.target.elements.searchQuery.value;
    
    pixabayAPI.fetchPhotos()
        .then(data => {
            //console.log(data);
            refs.galleryListEl.innerHTML = createGalleryCards(data.hits);
        })
        .catch(err => {
        console.log(err);
        })
    
};


refs.searchFormEl.addEventListener('submit', onSearchSubmit);