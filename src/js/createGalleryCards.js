'use strict'

export const createGalleryCards = cardInfo => {
    const cardArr = cardInfo.map(el => {
        return `
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