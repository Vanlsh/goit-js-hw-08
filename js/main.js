import { images } from "./images.js";

const gallery = document.querySelector("ul.gallery");
gallery.innerHTML = images
  .map(({ preview, original, description }) => {
    return `<li class="gallery-item">
                <a class="gallery-link" href="${original}">
                    <img class="gallery-image" src="${preview}" data-source="${original}" alt="${description}"/>
                </a>
            </li>`;
  })
  .join("");

const openFullImage = (event) => {
  event.preventDefault();
  const { source } = event.target.dataset;
  if (!source) return;
  const closeByEscape = (e) => {
    if (e.code === "Escape") instance.close();
  };
  const instance = basicLightbox.create(
    `<img class="modal-img" src="${source}" width="1112" height="640"/>`,
    {
      onShow: () => document.addEventListener("keydown", closeByEscape),
      onClose: () => document.removeEventListener("keydown", closeByEscape),
    }
  );
  instance.show();
};

gallery.addEventListener("click", openFullImage);
