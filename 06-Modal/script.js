'use strict';

const showModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");

for (let i = 0; i < showModal.length; i++) {
    showModal[i].addEventListener("click", function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    });
    
}

const hideModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

closeModal.addEventListener("click", hideModal);

overlay.addEventListener("click", hideModal);

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
        hideModal();
    }
});