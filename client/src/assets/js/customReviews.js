const reviewsModal = document.querySelector(".reviews-modal-body");
const btnReview = document.querySelector(".btn-review");
const btnReviewClose = document.querySelector(".reviews-modal__close");
////// Модалка на открытие отзыва
function showReview() {
    btnReview.addEventListener("click", () => {
        reviewsModal.classList.remove("hidden");
        reviewsModal.classList.add("open");
        btnReview.classList.add("hidden");
    });
    btnReviewClose.addEventListener("click", () => {
        reviewsModal.classList.add("hidden");
        reviewsModal.classList.remove("open");
        btnReview.classList.remove("hidden");
    });
}
showReview();
