import { galleryItems } from "./gallery-items.js";

// Функція для створення рядка HTML за шаблоном
function createGalleryItemHTML(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

// Рендер розмітки галереї
const galleryContainer = document.querySelector(".gallery");
const galleryItemsHTML = galleryItems.map(createGalleryItemHTML).join("");
galleryContainer.insertAdjacentHTML("beforeend", galleryItemsHTML);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt", // Вказати, що відображати у підпису (використовує значення атрибуту alt)
  captionPosition: "bottom", // Вказати позицію підпису (знизу)
  captionsDelay: 250, // Затримка перед відображенням підпису
});
