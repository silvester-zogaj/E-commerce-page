"use-strict";

// ===== VARIABLES =======

const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector(".sidebar__close");
const headerNavIcon = document.querySelector(".header__nav-icon");

const headerBasket = document.querySelector(".header__basket");
const headerBasketQuantity = document.querySelector(".header__basket-quantity");
const basket = document.querySelector(".basket");

const minusBtn = document.querySelector(".fa-minus");
const plusBtn = document.querySelector(".fa-plus");

const cartBtn = document.querySelector(".information__cart-btn");
const itemsAdded = document.querySelector(".information__items-added");
const closeMsg = document.querySelector(".information__close-msg");

const discount = document.querySelector(".discount");
const newPrice = document.querySelector(".new-price");
const oldPrice = document.querySelector(".old-price");

const basketNewPrice = document.querySelector(".basket__new-price");
const itemTotal = document.querySelector(".basket__item-total");
const basketQuantity = document.querySelector(".basket__item-quantity");
const trashBtn = document.querySelector(".trash-btn");
const basketImg = document.querySelector(".basket__img");

const modalBg = document.querySelector(".modal__bg");
const modalContainer = document.querySelector(".modal__container");
const modalImg = document.querySelector(".modal__img");
const modalClose = document.querySelector(".modal__close");

const imagesContainer = document.querySelectorAll("#img-container .img-container__small--img");
const imagesSmall = document.querySelectorAll("#img-container .img-container__small--img img");
const imagesModal = document.querySelectorAll(".modal__bg .img-container__small--img");
const imagesModalSmall = document.querySelectorAll(".modal__bg .img-container__small--img img");
const mainImg = document.querySelector(".img-container__big--img");

const prevBtn = document.querySelector(".fa-circle-chevron-left");
const nextBtn = document.querySelector(".fa-circle-chevron-right");

// ====== GENERAL ======
let count = 0; // quantity of items to add/remove from basket
let countTotal = 0; // adds the count onto itself to equal a new total value. Represents adding multiple items over and over to the basket without resetting its value.
let isClicked = true; // Toggle function variable
let isModalOpen; // Check if modal is open or not

const newDiscount = discount.innerHTML / 100;
newPrice.innerHTML = oldPrice.innerHTML - newDiscount * oldPrice.innerHTML + ".00";
basketNewPrice.innerHTML = "$" + newPrice.innerHTML;

//============ SIDEBAR FUNCTIONALITY============

headerNavIcon.addEventListener("click", function () {
  sidebar.style.display = "block";
  modalBg.style.display = "block";
  modalContainer.style.display = "none";
});

sidebarClose.addEventListener("click", function () {
  sidebar.style.display = "none";
  modalBg.style.display = "none";
});

//============= BASKET FUNCTIONALITY ==============

// toggles basket on/off whenever clicked
headerBasket.addEventListener("click", function () {
  toggle(basket);
});

function toggle(item) {
  if (isClicked) {
    item.style.display = "block";
    isClicked = false;
  } else {
    item.style.display = "none";
    isClicked = true;
  }
}

// if anything clicked that isn't the basket icon or the basket-pop up, then remove basket pop-up. Since basket icon has a toggle however, it'll close anyway once clicked.
document.addEventListener("click", function (e) {
  if (e.target.closest(".header__basket")) {
    return;
  } else if (e.target.closest(".basket")) {
    return;
  } else {
    basket.style.display = "none";
    isClicked = true;
  }
});

//============ ADD-TO-CART QUANTITY FUNCTIONALITY ================

// Count variable set to 0. Whenever + or - are clicked, increase count by 1 and -1 respectively.
plusBtn.addEventListener("click", function () {
  count++;
  if (count >= 10) {
    count = 10;
  }
  document.querySelector(".information__value").innerHTML = count;
});

minusBtn.addEventListener("click", function () {
  count--;
  if (count < 0) {
    count = 0;
  }
  document.querySelector(".information__value").innerHTML = count;
});

//============ ADD-TO-CART BUTTON FUNCTIONALITY ==============

cartBtn.addEventListener("click", function () {
  if (count > 0) {
    countTotal += count;
    document.querySelector(".basket__empty-message").style.display = "none";
    document.querySelector(".basket__items").style.display = "block";

    itemsAdded.style.transition = ".2s ease-in";
    itemsAdded.style.opacity = "1";
    itemsAdded.style.visibility = "visible";
    itemsAdded.style.display = "block";

    basketQuantity.innerHTML = countTotal;
    headerBasketQuantity.innerHTML = countTotal;
    headerBasketQuantity.style.display = "block";

    itemTotal.innerHTML = "$" + newPrice.innerHTML * basketQuantity.innerHTML + ".00";
    document.querySelector(".information__value").innerHTML = 0;
    count = 0;
  }
});

// ========== RESET MESSAGE BOX ==============
closeMsg.addEventListener("click", function () {
  resetMsg();
});

function resetMsg() {
  itemsAdded.style.transition = "0s";
  itemsAdded.style.opacity = "0";
  itemsAdded.style.visibility = "hidden";
}

// ========= Trash Button Functionality ==============

trashBtn.addEventListener("click", function () {
  document.querySelector(".basket__empty-message").style.display = "block";
  document.querySelector(".basket__items").style.display = "none";
  headerBasketQuantity.style.display = "none";
  headerBasketQuantity.innerHTML = 0;
  countTotal = 0;
  resetMsg();
});

// =============== IMAGES ================
//large image and basket image will always be the same as the first image
mainImg.src = imagesSmall[0].src;
basketImg.src = imagesSmall[0].src;

//  modal images will take image source from outside container
imagesSmall.forEach(function (image, index) {
  imagesModalSmall[index].src = image.src;
});

//=========== OPEN MODAL=========

imageIndex = 0;
showModal(imageIndex);

// immediately goes to the number argument invoked
function toSlide(n) {
  showModal((imageIndex = n));
  modalBg.style.display = "flex";
  modalContainer.style.display = "block";
}

// calculates based on the number invoked. If positive it'll add onto itself, thus increasing (next), if negative will subtract (previous)
function changeSlide(n) {
  showModal((imageIndex += n));
  for (let i = 0; i < imagesModal.length; i++) {
    imagesContainer[i].classList.remove("active");
    imagesModal[i].classList.remove("active");
  }
  imagesModal[imageIndex].classList.add("active");
  imagesContainer[imadeIndex].classList.add("active");
}

// if the index goes beyond the images we have, reset it back to the first.
function showModal(n) {
  if (n > imagesSmall.length - 1) {
    imageIndex = 0;
  }

  // if the index goes below the images we have, reset it back to the last.
  if (n < 0) {
    imageIndex = imagesSmall.length - 1;
  }

  // show modal image of the the photo of the index number we are curretly on.
  modalImg.src = imagesSmall[imageIndex].src;

  isModalOpen = true;
}

// ========= SWITCH IMAGES WITH ARROW KEYS =========

document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft" && isModalOpen === true) {
    changeSlide(-1);
  }
  if (e.key === "ArrowRight" && isModalOpen === true) {
    changeSlide(1);
  }
});

// ========= CLOSE MODAL =========
for (let i = 0; i < imagesContainer.length; i++) {
  modalClose.addEventListener("click", function () {
    modalBg.style.display = "none";
    imagesContainer[i].classList.remove("active");
    imagesModal[i].classList.remove("active");
    isModalOpen = false;
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modalBg.style.display = "none";
      imagesContainer[i].classList.remove("active");
      imagesModal[i].classList.remove("active");
      isModalOpen = false;
    }
  });
}

// ========== ACTIVE IMAGE ==============

// first loop is to run through all the images. Once image is clicked,second loop removes the active class from all, and then put it back onto the one that has been specficially clicked on due to the index we are currently on.
for (let i = 0; i < imagesModal.length; i++) {
  imagesModal[i].addEventListener("click", function () {
    for (let j = 0; j < imagesModal.length; j++) {
      imagesModal[j].classList.remove("active");
      imagesContainer[j].classList.remove("active");
    }

    imagesModal[i].classList.add("active");
    imagesContainer[i].classList.add("active");
  });

  imagesContainer[i].addEventListener("click", function () {
    for (let j = 0; j < imagesContainer.length; j++) {
      imagesModal[j].classList.remove("active");
      imagesContainer[j].classList.remove("active");
    }
    imagesModal[i].classList.add("active");
    imagesContainer[i].classList.add("active");
  });
}

// ========== SCROLL FUNCTIONALITY =============

// message disappears when scrolled after a certain point.
window.addEventListener("scroll", myScrollFunction);

function myScrollFunction() {
  const y = window.scrollY;
  if (y >= 50) {
    return;
  } else {
    itemsAdded.style.opacity = "0";
    itemsAdded.style.visibility = "hidden";
  }
}

// ============ MEDIA QUERIES ==============
// If media query matches
function screenFunction(screen) {
  if (screen.matches) {
    sidebar.style.display = "none";
    modalBg.style.display = "none";
    itemsAdded.style.display = "none";
  } else {
    sidebar.style.display = "none";
    modalBg.style.display = "none";
    itemsAdded.style.display = "none";
  }
}

const screen = window.matchMedia("(min-width: 870px)");
screenFunction(screen); // Screen changes take effect on load.
screen.addListener(screenFunction); // Screen changes take effect upon screen size changing. The screen listens for the change in screen size, then runs the function above.
