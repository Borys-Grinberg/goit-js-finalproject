import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
let lightboxInstance = null;

function createGalleryItemHTML(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

function openModal(imageURL) {
  lightboxInstance = basicLightbox.create(
    `<img src="${imageURL}" alt="Image description">`,
    {
      onShow: () => {
        // Додаємо обробник події для закриття модального вікна по натисканню клавіші Escape
        document.addEventListener("keydown", closeOnEscape);
      },
      onClose: () => {
        // Видаляємо обробник події для закриття по Escape
        document.removeEventListener("keydown", closeOnEscape);
      },
    }
  );

  lightboxInstance.show();
}

function closeModal() {
  if (lightboxInstance) {
    lightboxInstance.close();
    lightboxInstance = null;
  }
}

function closeOnEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

galleryContainer.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("gallery__image")) {
    const largeImageURL = e.target.dataset.source;
    openModal(largeImageURL);
  }
});

function renderGallery(galleryItems) {
  const galleryItemsHTML = galleryItems.map(createGalleryItemHTML).join("");
  galleryContainer.insertAdjacentHTML("beforeend", galleryItemsHTML);
}

renderGallery(galleryItems);
