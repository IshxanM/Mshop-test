const emptyCart = document.querySelector(".empty-cart");
let countItem = document.querySelector(".showCountItem").innerText;
let order = document.querySelector(".order_js");
const btnModal = document.querySelector(".btn-modal");
const hystmodal2 = document.querySelector(".hystmodal2");
const hystmodal__close2 = document.querySelector(".hystmodal__close2");
const deleteproductbasket = document.querySelector(".deleteproductbasket");

//Показ/удаление текста "Корзина пуста"
function showCartLength() {
    if (countItem < 1) {
        emptyCart.classList.add("visible");
        deleteproductbasket.classList.add("novisible");
    } else {
        emptyCart.classList.remove("visible");
        order.classList.remove("novisible");
        deleteproductbasket.classList.remove("novisible");
    }
}

showCartLength();

btnModal.addEventListener("click", () => {
    hystmodal2.classList.add("open");
    hystmodal__close2.addEventListener("click", () => {
        hystmodal2.classList.remove("open");
    });
});
