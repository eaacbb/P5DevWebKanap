//Récupération de l'ID de l'Url de chaque produit
let product;
(async function() {
    const productId = getProductId();
    //console.log(productId); //Vérification que l'ID est bien récupéré
    product = await getProduct(productId);
    //console.log(product); //Vérification que le produit correspondant a l'ID dans le Array est bien entièrement récupéré
    displayProduct(product);
})();

function getProductId() {
    return new URL(location.href).searchParams.get("id"); //Récupération de l'ID avec location (utilisation de la console puis ctrl+c/ctrl+v)
};

//Fetch des données produits du Array comme dans la première partie du projet
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id) // Je n'arrive pas a le faire fonctionner avec ".../product?id=${productId}" du coup j'utilise " + productId"
    .then(function(productsCards) {
        return productsCards.json();
    })
    .then(function(products) {
        return products;
    })
    //Au cas où un disfonctionnement se produit, réaction à l'erreur
    .catch(function(err) {
        console.log("An error as occured") //Affichage dans la console du malfonctionnement
        itemsCards.innerHTML = "An error as occured and your product cannot be displayed for now, please try again later." //Affichage sur l'interface utilisateur du malfonctionnement
    });
}

//Déclaration des variables correspondantes aux classes des DIV a implémenter en HTML
const sectionItem = document.querySelector(".item"); //Variable crée pour afficher une erreur à l'utilisateur (je n'arrive pas a créer l'erreur, essayer en utilisant des .then puis .catch dans displayProduct)
const itemImg = document.querySelector(".item__img");
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDesc = document.getElementById("description");
const itemColor = document.getElementById("colors");
const itemQuantity = document.getElementById("quantity");

//Fonction d'implémentation des données du produit en HTML
function displayProduct(product) {
    itemImg.innerHTML = `<img src=${product.imageUrl} alt="${product.altTxt}">`; //Problème réglé avec querySelector
    itemTitle.innerHTML = product.name;
    itemPrice.innerHTML = product.price;
    itemDesc.innerHTML = product.description;
    //Déclaration de la variable colorOptions (contenu du Array "colors" provenant du Array "product")
    const colorOptions = product.colors;
    //console.log(colorOptions); //Affichage du Array "colors" dans le Array "product"
    //Implémentation des options dans l'HTML avec une boucle
    for (let i = 0; i < colorOptions.length; i++) {
        itemColor.innerHTML += `<option value="${colorOptions[i]}">${colorOptions[i]}</option>`; //Fonctionne (Nécessité absolue de créer une boucle for - ? fonctionne pas si rentrés un par un)
    }
}

//Ajout des produits au panier

//Donner une valeur à la quantité selectionnée et le stocker dans une variable
let productQuantity = 0;
quantity.addEventListener('input', event => {
    productQuantity = Number.parseInt(event.target.value);
});

//Donner une valeur à la couleur selectionnée et le stocker dans une variable
let productColor = "";
colors.addEventListener('input', event => {
    productColor = event.target.value;
});

//Créer un evenement pour ajouter les valeurs selectionnées dans une variable à stocker
const addToCart = document.getElementById("addToCart");
let params = new URL(document.location).searchParams;
let id = params.get("id");
let Article = class {
    constructor(_id, quantity, color, imageUrl, name, altTxt,) {
        this._id = _id;
        this.quantity = quantity;
        this.color = color;
        this.imageUrl = imageUrl;
        this.name = name;
        this.altTxt = altTxt;
    }
};

addToCart.addEventListener('click', event => {
    let article = new Article();
    article._id = id;
    if (productQuantity == 0) {
        return alert("Please select a quantity");
    }else if (productColor == "") {
        return alert("Please select a color");
    }
    else {
        article.quantity = productQuantity;
        article.color = productColor;
    }

    fetch("http://localhost:3000/api/products/" + id)
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then(function (product) {
            if (localStorage.getItem('cartArray') === null) {
                let cart = [];
                cart.push(article);
                let couch = JSON.stringify(cart);
                localStorage.setItem('cartArray', couch);
            }else{
                let cart = [];
                cart = JSON.parse(localStorage.getItem('cartArray'));
                let setProduct;
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i]._id === article._id && cart[i].color === article.color) {
                        setProduct = cart[i]
                    }
                }
                if (setProduct) {
                    article.quantity = Number.parseInt(article.quantity) + Number.parseInt(setProduct.quantity);
                    let indexOfSetProduct = cart.indexOf(setProduct);
                    cart.splice(indexOfSetProduct, 1);
                }
                cart.push(article);
                let couch = JSON.stringify(cart);
                localStorage.setItem('cartArray', couch);
            }
        })
});