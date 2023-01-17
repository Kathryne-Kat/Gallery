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

    fetchDifferentPhotos() {
        const randomPage = Math.ceil((1 + Math.random() * (12 + 1 - 1)));
        console.log(randomPage);
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



//https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo

    // fetchPhotos() {
    //     const searchParams = new URLSearchParams({
    //         q: this.query,
    //         page: this.page,
    //         per_page:40,
    //         image_type:'photo',
    //         orientation: 'horizontal',
    //         safesearch: true,
    //         key:PixabayAPI.API_KEY,
    //     })
    //     return fetch(
    //         `${PixabayAPI.BASE_URL}?${searchParams}`
    //     )
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error(res.status);
    //             }
    //             return res.json();
    //     })
    // }
