//Afficher les produits sur le panier

let cart = [];
cart = JSON.parse(localStorage.getItem('cartArray'));
const productDisplay = document.getElementById("cart__items");
const quantityChange = document.getElementsByClassName("itemQuantity");
const deleteItem = document.getElementsByClassName("deleteItem");
const itemQuantityDiv = document.getElementsByClassName("cart__item__content__settings__quantity");
const totalQty = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

if (cart != null) {
    for (let i = 0; i < cart.length; i++) {
        fetch("http://localhost:3000/api/products/" + cart[i]._id)
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then(function (data) {
            productDisplay.innerHTML +=
            `<article class="cart__item" id=${cart[i]._id} data-color=${cart[i].color}>
            <div class="cart__item__img">
              <img src=${data.imageUrl} alt=${data.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
               <h2>${data.name}</h2>
               <p>${(cart[i].color)}</p>
               <p class="total">${data.price}€ x ${cart[i].quantity} = ${(data.price * cart[i].quantity)}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${(cart[i].quantity)}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer  </p>
                </div>
              </div>
             </div>
          </article>`
        })
    }
}

// Formulaire

/*document.getElementById("formulaire").addEventListener("submit", function(e) {
    e.preventDefault();
    let erreur;
    let prenom = document.getElementById("firstname");
    let nom = document.getElementById("lastname");
    let adresse = document.getElementById("address");
    let ville = document.getElementById("city");
    let email = document.getElementById("email");
    let validation = document.getElementById("order");
    alert('Formulaire envoyé !');
});

console.log(document.forms);*/