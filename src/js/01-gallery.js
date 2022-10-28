// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

const lightbox = new SimpleLightbox('.gallery > li > a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function createGalleryMarkup(data) {
  return data
    .map(({ preview, original, description }) => {
      return `<li>
                        <a class="gallery__item" href="${original}">
                            <img class="gallery__image" src="${preview}" alt="${description}" />
                        </a>
                    </li>`;
    })
    .join('');
}
