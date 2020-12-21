const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

//переменные ссылки
const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalBox: document.querySelector(".lightbox"),
  modalImgRef: document.querySelector(".lightbox__image"),
  closeModalBtn: document.querySelector("button[data-action='close-lightbox']"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
};

// функция создания разметки галереи
// через инсерт не делал, чисто изза лекций Саши Репеты, потом будем делать)) (оно изи)

// ================  вариант с созданием пустого массива и push в него  ============

/* function addGalleryElements() {
  let arrOfElements = [];
  let indexNumber = 0;

  images.forEach((image) => {
    const liElementRef = document.createElement("li");
    liElementRef.classList.add("gallery__item");

    const linkRef = document.createElement("a");
    linkRef.classList.add("gallery__link");
    linkRef.href = image.original;

    const imgRef = document.createElement("img");
    imgRef.classList.add("gallery__image");
    imgRef.src = image.preview;
    imgRef.alt = image.description;
    imgRef.dataset.value = image.original;
    imgRef.dataset.index = indexNumber += 1;

    linkRef.appendChild(imgRef);
    liElementRef.appendChild(linkRef);
    arrOfElements.push(liElementRef);
  });
  refs.gallery.append(...arrOfElements);
} */

// =========== вариант с map ====================
function addGalleryElements() {
  let indexNumber = 0;

  const arrOfElements = images.map((image) => {
    const liElementRef = document.createElement("li");
    liElementRef.classList.add("gallery__item");

    const linkRef = document.createElement("a");
    linkRef.classList.add("gallery__link");
    linkRef.href = image.original;

    const imgRef = document.createElement("img");
    imgRef.classList.add("gallery__image");
    imgRef.src = image.preview;
    imgRef.alt = image.description;
    imgRef.dataset.value = image.original;
    imgRef.dataset.index = indexNumber += 1;

    linkRef.appendChild(imgRef);
    liElementRef.appendChild(linkRef);
    return liElementRef;
  });
  refs.gallery.append(...arrOfElements);
}

addGalleryElements();

//delegation

refs.gallery.addEventListener("click", onGalleryClick);
refs.closeModalBtn.addEventListener("click", onModalClose);
refs.modalOverlay.addEventListener("click", onBackDropCLose);

//открытие модалки с картинкой полного размера
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const originalPictureRef = event.target.dataset.value;
  refs.modalImgRef.src = originalPictureRef;
  onModalOpen();

  // прокрутка галереи при клике

  let activeIndex = Number(event.target.dataset.index);

  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && activeIndex < images.length - 1) {
      activeIndex += 1;
      refs.modalImgRef.src = images[activeIndex].original;
    } else if (event.code === "ArrowLeft" && activeIndex > 0) {
      activeIndex -= 1;
      refs.modalImgRef.src = images[activeIndex].original;
    }
  });
}

// добавляет клас для модалки
function onModalOpen() {
  refs.modalBox.classList.add("is-open");
  window.addEventListener("keydown", onPressEvent);
}

// снимает клас для закрытия модалки
function onModalClose() {
  refs.modalBox.classList.remove("is-open");
  refs.modalImgRef.src = "";
}

// для закрытия по кнопке
function onPressEvent(event) {
  if (event.code === "Escape") {
    onModalClose();
  }
}

// закрыват по клике на оверлей
function onBackDropCLose(event) {
  if (event.target === event.currentTarget) {
    onModalClose();
  }
}
