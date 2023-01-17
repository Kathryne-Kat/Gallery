'use strict'
import axios from 'axios';

export class PixabayAPI{
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '32874837-b80d8d28c89d7fde167f58902'

    constructor() {
        this.page = 1;
        this.query = null;
    }
    fetchPhotos() {
        const searchParams = {
            params: {
                q: this.query,
                page: this.page,
                per_page: 40,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                key: PixabayAPI.API_KEY,
            },
        };
        return axios.get(`${PixabayAPI.BASE_URL}`,searchParams);
    }

    fetchRandomPhotos() {
        const randomPage = Math.ceil((1 + Math.random() * (12 + 1 - 1)));
        //console.log(randomPage);
        const searchParams = {
                params: {
                page:randomPage,                   
                per_page: 40,
                category: 'nature',
                //colors: "yellow", 
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                key: PixabayAPI.API_KEY,
            },
        };
        return axios.get(`${PixabayAPI.BASE_URL}`,searchParams);
    }
}