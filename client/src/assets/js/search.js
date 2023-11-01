const dataProduct = document.querySelector(".product_data").children.length;
const emptySerach = document.querySelector(".empty-search");
console.log(dataProduct);
//Показ/удаление текста "Корзина пуста"
function showResultSearch() {
    if (dataProduct < 1) {
        emptySerach.classList.add("visible");
        emptySerach.classList.remove("novisible");
    } else {
        emptySerach.classList.remove("visible");
    }
}

showResultSearch();
