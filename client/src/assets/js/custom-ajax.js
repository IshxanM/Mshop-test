// const addToCartSession = document.querySelector(".addToCartSession");
// const QTY = document.querySelector(".QTY").value;

// var quantity2 = $(addToCartSession)
//     .closest(".product-item ")
//     .find(".qty")
//     .val();

// console.log(QTY);
// console.log(quantity2);
// if (QTY < quantity2) {
//     console.log("выбрано больше чем есть в наличии");
//     event.preventDefault();
// } else {
//     console.log(" все норм");
// }

// const

// const QTY = document.querySelector(".QTY").value;
// console.log(quantity2);

//Добавление в корзину
$(document).ready(function () {
    // var btnAddCart = $(".addToCartSession")
    //     .closest(".product-item ")
    //     .find(".addToCart");
    // var quantityCart = $(".addToCartSession")
    //     .closest(".product-item ")
    //     .find(".qty")
    //     .val();
    // console.log(quantityCart);
    //Добавление через сессию
    // fetchQuantity();
    // function fetchQuantity() {
    //     var productId = $(".addToCartSession")
    //         .closest(".product-item ")
    //         .find(".productId")
    //         .val();
    //     var quantity = $(".addToCartSession")
    //         .closest(".product-item ")
    //         .find(".qty")
    //         .val();
    //     console.log(productId);
    //     $.ajax({
    //         type: "GET",
    //         url: "/fetchQuantity",
    //         data: {
    //             productId: productId,
    //             quantity: quantity,
    //         },
    //         headers: {
    //             "X-CSRF-TOKEN": document
    //                 .querySelector('meta[name="csrf-token"]')
    //                 .getAttribute("content"),
    //         },
    //         dataType: "json",
    //         success: function (responce) {
    //             console.log(responce.dataQuantity);
    //         },
    //     });
    // }

    $(".addToCartSession").click(function (e) {
        e.preventDefault();
        var productId = $(this)
            .closest(".product-item ")
            .find(".productId")
            .val();
        var quantity = $(this).closest(".product-item ").find(".qty").val();
        const cardQuantityElem = $(this)
            .closest(".product-item ")
            .find(".card_quantity");
        const inStock = $(this)
            .closest(".product-item ")
            .find(".cartQTY")
            .val();
        const addToCartElem = $(this)
            .closest(".product-item ")
            .find(".addToCartSession");

        $.ajax({
            method: "post",
            url: "/addToCartSession",
            data: {
                productId: productId,
                quantity: quantity,
            },
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            success: function (response) {
                let status = response.status;

                let count = response.count;
                let countCartQuantity = response.countCartQuantity;
                cardQuantityElem[0].innerText = countCartQuantity;
                let countInCart = (cardQuantityElem[0].innerText =
                    countCartQuantity);
                // console.log(addToCartElem[0]);
                if (+inStock <= countInCart) {
                    addToCartElem[0].classList.add("hidden");

                    // console.log("скрыть");
                } else {
                }

                // console.log(cardQuantity);
                // cardQuantityElem[0] = countCartQuantity;
                // console.log(cardQuantityElem.innerText);
                // let cardQuantityElem =
                //     document.querySelectorAll(".addToCartSession");

                // window.addEventListener("click", function (event) {
                //     //проверяем что клик был совершён по кнгопке " Добавить в корзину"
                //     console.log(event.target);
                //     // if (event.target) {
                //     //     console.log("нажата по той кнопке");
                //     // } else {
                //     //     console.log("не по той кнопке");
                //     // }
                // });

                // (cardQuantityElem.innerText = `${countCartQuantity}`);

                // console.log(status);
                let countItem = document.querySelector(".showCountItem");

                countItem.innerText = `${count}`;

                function showStatus(status) {
                    const hystmodal = document.querySelector(".hystmodal");
                    const hystmodal__close =
                        document.querySelector(".hystmodal__close");
                    hystmodal.classList.add("open");

                    hystmodal__close.addEventListener("click", () => {
                        hystmodal.classList.remove("open");
                    });

                    const statusText = document.querySelector(".status-text");

                    statusText.innerHTML = `<div class="status-text">${status}</div>`;
                }

                showStatus(status);
            },
        });
    });

    /***** */

    $(".addToCart").click(function (e) {
        e.preventDefault();
        var productId = $(this)
            .closest(".product-item ")
            .find(".productId")
            .val();
        var quantity = $(this).closest(".product-item ").find(".qty").val();
        const cardQuantityElem = $(this)
            .closest(".product-item ")
            .find(".card_quantity");
        const inStock = $(this)
            .closest(".product-item ")
            .find(".cartQTY")
            .val();
        const addToCartElem = $(this)
            .closest(".product-item ")
            .find(".addToCart");

        $.ajax({
            method: "post",
            url: "/addCart",
            data: {
                productId: productId,
                quantity: quantity,
            },
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            success: function (response) {
                let status = response.status;

                let count = response.count;

                let countCartQuantity = response.countCartQuantity;
                let countInCart = (cardQuantityElem[0].innerText =
                    countCartQuantity);
                // console.log(addToCartElem[0]);
                if (+inStock <= countInCart) {
                    addToCartElem[0].classList.add("hidden");
                    // console.log("скрыть");
                } else {
                }

                let countItem = document.querySelector(".showCountItem");
                countItem.innerText = `${count}`;

                function showStatus(status) {
                    const hystmodal = document.querySelector(".hystmodal");
                    const hystmodal__close =
                        document.querySelector(".hystmodal__close");
                    hystmodal.classList.add("open");

                    hystmodal__close.addEventListener("click", () => {
                        hystmodal.classList.remove("open");
                    });

                    const statusText = document.querySelector(".status-text");

                    statusText.innerHTML = `<div class="status-text">${status}</div>`;
                }

                showStatus(status);
            },
        });
    });

    //увеличение товара на единицу
    // $(".incriment-btn").click(function (e) {
    //     e.preventDefault();
    //     var incValue = $(this)
    //         .closest(".product_data")
    //         .find(".qty-input")
    //         .val();
    //     var value = parseInt(incValue, 10);
    //     value = isNaN(value) ? 0 : value;
    //     if (value) {
    //         value++;
    //         console.log(value);
    //         $(this).closest(".product_data").find(".qty-input").val(value);
    //     }
    // });
    //Уменьшение товара на единицу
    // $(".decrement-btn").click(function (e) {
    //     e.preventDefault();
    //     var decValue = $(this)
    //         .closest(".product_data")
    //         .find(".qty-input")
    //         .val();
    //     var value = parseInt(decValue, 10);
    //     value = isNaN(value) ? 0 : value;
    //     if (value > 1) {
    //         value--;
    //         $(this).closest(".product_data").find(".qty-input").val(value);
    //     }
    // });
    //Удаление товара с корзины с помощью аякс
    $(".delete-cart-item").click(function (e) {
        e.preventDefault();
        var prod_id = $(this).closest(".product_data").find(".prod_id").val();
        $.ajax({
            method: "post",
            url: "/deleteCartItem",
            data: {
                prod_id: prod_id,
            },
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            success: function (response) {
                window.location.reload();
            },
        });
    });
    //Увеличение товара на единицу с помощью аякс
    $(".incriment-btn").click(function (e) {
        e.preventDefault();

        var prod_id = $(this).closest(".product_data").find(".prod_id").val();

        const qtyinput = e.target
            .closest(".product_data")
            .querySelector("[data-counter]");

        $.ajax({
            method: "post",
            url: "/plus",
            data: {
                prod_id: prod_id,
            },
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            success: function (response) {
                let quantity = response.quantity;

                location.reload();
            },
        });
    });

    //Уменьшение товара на единицу с помощью аякс
    $(".decrement-btn").click(function (e) {
        e.preventDefault();
        var prod_id = $(this).closest(".product_data").find(".prod_id").val();
        const qtyinput = e.target
            .closest(".product_data")
            .querySelector("[data-counter]");
        $.ajax({
            method: "post",
            url: "/minus",
            data: {
                prod_id: prod_id,
            },
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            success: function (response) {
                let quantity = response.quantity;

                // let price = document.querySelector(".price").value;
                // let cost = document.querySelector(".basketCost");
                // function getCartPrice() {
                //     let itemCost = +price * +quantity;

                //     basketCost = +countItem + itemCost;

                //     cost.innerHTML = `${basketCost}`;
                //     console.log(cost);
                // }
                location.reload();
                //getCartPrice();
                //qtyinput.innerHTML = `  <div id="qtyinput">  ${quantity} </div>`;
            },
        });
    });
});

// $(".search_btn").click(function (e) {
//     e.preventDefault();
//     let input = document.querySelector("#search");

//     let value = input.value;
//     if (value == "") {

//     } else {
//         list.forEach((elem) => {
//             elem.classList.remove("hide");
//         });
//     }
// });

// $(".del_btn").click(function (e) {
//     e.preventDefault();

//     let input = document.querySelector("#search");

//     let value = input.value;

//     let list = document.querySelectorAll(".product_data li");
//     if (value != "") {
//         list.forEach((elem) => {
//             elem.classList.remove("hide");
//             input.value = "";
//         });
//     } else {
//         list.forEach((elem) => {});
//     }
// });
// let setCount = document.querySelector("#search");
// let quantity2 = closest(".product-item ").find(".qty").val();
// console.log(quantity2);
// function setCount() {}
