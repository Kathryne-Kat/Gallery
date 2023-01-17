'use strict'

export const createGalleryCards = cardInfo => {
    const cardArr = cardInfo.map(el => {
      return `
              <a href="${el.largeImageURL}" class="gallery__item">                     
                    <img class="gallery-img " src="${el.webformatURL}" alt="${el.tags}"  loading="lazy" title=""/>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes </b>${el.likes}
                        </p>
                        <p class="info-item">
                            <b>Views </b>${el.views}
                        </p>
                        <p class="info-item">
                            <b>Comments </b>${el.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads </b>${el.downloads}
                        </p>
                    </div>                
              </a>
            `;
    });
    return cardArr.join('');
};









{/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */}



{/* <a href="images/image1.jpg"><img src="${el.webformatURL}" alt="${el.tags}" title=""/>
                <div class="photo-card">
                    <img class="gallery-img " src="${el.webformatURL}" alt="${el.tags}"  loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes ${el.likes}</b>
                        </p>
                        <p class="info-item">
                            <b>Views ${el.views}</b>
                        </p>
                        <p class="info-item">
                            <b>Comments ${el.comments}</b>
                        </p>
                        <p class="info-item">
                            <b>Downloads ${el.downloads}</b>
                        </p>
                    </div>
                </div>
              </a>
            `; */}