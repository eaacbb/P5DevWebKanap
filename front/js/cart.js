//Afficher les produits sur le panier

let cart = [];
cart = JSON.parse(localStorage.getItem('cartArray'));
const productDisplay = document.getElementById("cart__items");
const quantityChange = document.getElementsByClassName("itemQuantity");
const deleteItem = document.getElementsByClassName("deleteItem");
const itemQuantityDiv = document.getElementsByClassName("cart__item__content__settings__quantity");
const totalQty = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

                //Boucle d'implémentation des produits du panier
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
                //Suppression de l'article
          for (let i = 0; i < deleteItem.length; i++) {
            deleteItem[i].addEventListener("click", () => {
              articleToDel = deleteItem[i].closest('article');
              const artColor = articleToDel.dataset.color
              const idColor = articleToDel.id
              cart = cart.filter(cart => (artColor || idColor) != (cart.color || cart._id));
              localStorage.setItem('cartArray', JSON.stringify(cart));
              document.location.reload()
            })
          }
                //Calcul du nombre d'articles et du prix total
          let totalOfPrice = 0
          let totalOfArticle = 0
          for (let i = 0; i < cart.length; i++) {
            totalOfPrice += cart[i].quantity * data.price;
            totalOfArticle += cart[i].quantity
          }
          totalPrice.innerHTML = `${totalOfPrice}`;
          totalQty.innerHTML = `${totalOfArticle}`;
                //Modification de la quantité
          for (let i = 0; i < itemQuantityDiv.length; i++) {
              itemQuantityDiv[i].addEventListener("click", (event) => {
              itemModif = itemQuantityDiv[i].closest('article');
              const idOfItem = itemModif.id
              const ColorOfItem = itemModif.dataset.color
              let quantiteAjout = itemModif
              quantiteAjout = Number.parseInt(event.target.value);
              let index = cart.findIndex(cart => (idOfItem === cart._id) && (cart.color === ColorOfItem));
              cart[index].quantity = quantiteAjout;
              localStorage.setItem('panier', JSON.stringify(cart))
                //Modification du prix total d'un article en fonction de la quantité
              let modPrice = document.getElementsByClassName("total");
              if (cart[index].quantity == 0) {
                document.location.reload()
              } else {
                modPrice[index].innerHTML = `${data.price}€ x ${cart[index].quantity} = ${(data.price * cart[index].quantity)}€`
              }
                //Modification du prix total
              let totalOfPrice = 0
              let totalOfArticle = 0
              for (let i = 0; i < cart.length; i++) {
                totalOfPrice = totalOfPrice + (cart[i].quantity * data.price);
                totalOfArticle = totalOfArticle + cart[i].quantity
              }
              totalPrice.innerHTML = `${totalOfPrice}`;
              totalQty.innerHTML = `${totalOfArticle}`;
            })
          }
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