import { images } from "./images.js";

const gallery = document.querySelector("ul.gallery");

images.forEach(({ preview, original, description }) => {
  gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery-item">
        <a class="gallery-link" href="${original}">
            <img
              class="gallery-image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
        </a>
    </li>`
  );
});

const linksToImages = document.querySelectorAll("a.gallery-link");

linksToImages.forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});

const openFullImage = (event) => {
  const { source } = event.target.dataset;
  if (!source) return;
  const closeByEscape = (e) => {
    if (e.code === "Escape") instance.close();
  };
  const instance = basicLightbox.create(
    `<img class="modal-img" src="${source}" width="1112" height="640"/>`,
    {
      onClose: () => {
        document.removeEventListener("keydown", closeByEscape);
      },
    }
  );
  document.addEventListener("keydown", closeByEscape);
  instance.show();
};

gallery.addEventListener("click", openFullImage);
