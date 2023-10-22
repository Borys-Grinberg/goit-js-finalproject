import { galleryItems } from "./gallery-items.js";
// Отримуємо контейнер ul.gallery
const galleryContainer = document.querySelector(".gallery");
let lightboxInstance = null;

// Функція для створення рядка HTML за шаблоном
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

// Функція для відкриття модального вікна
function openModal(imageURL) {
  lightboxInstance = basicLightbox.create(
    `<img src="${imageURL}" alt="Image description">`
  );
  lightboxInstance.show();

  // Додаємо обробник події для закриття модального вікна по натисканню клавіші Escape
  document.addEventListener("keydown", closeOnEscape);
}

// Функція для закриття модального вікна
function closeModal() {
  if (lightboxInstance) {
    lightboxInstance.close();
    lightboxInstance = null;

    // Видаляємо обробник події для закриття по Escape
    document.removeEventListener("keydown", closeOnEscape);
  }
}

// Функція для закриття модального вікна по клавіші Escape
function closeOnEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

// Додаємо обробник події на контейнер ul.gallery для делегування
galleryContainer.addEventListener("click", (e) => {
  e.preventDefault(); // Забороняємо перенаправлення за замовчуванням

  // Перевіряємо, чи клікнули на зображення
  if (e.target.classList.contains("gallery__image")) {
    // Отримуємо URL великого зображення з атрибуту data-source
    const largeImageURL = e.target.dataset.source;

    // Відкриваємо модальне вікно
    openModal(largeImageURL);
  }
});

// Викликаємо функцію рендерингу галереї
function renderGallery(galleryItems) {
  const galleryItemsHTML = galleryItems.map(createGalleryItemHTML).join("");
  galleryContainer.insertAdjacentHTML("beforeend", galleryItemsHTML);
}

// Викликаємо функцію рендерингу галереї
renderGallery(galleryItems);
