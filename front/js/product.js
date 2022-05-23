//Récupération de l'ID de l'Url de chaque produit
(async function() {
    const productId = getProductId();
    console.log(productId); //Vérification que l'ID est bien récupéré
    const product = await getProduct(productId);
    console.log(product); //Vérification que le produit correspondant a l'ID dans le Array est bien entièrement récupéré
    displayProduct(product);
})();

function getProductId() {
    return new URL(location.href).searchParams.get("id"); //Récupération de l'ID avec location (utilisation de la console puis ctrl+c/ctrl+v)
};

//Fetch des données produits du Array comme dans la première partie du projet
function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/" + productId) // Je n'arrive pas a le faire fonctionner avec ".../product?id=${productId}" du coup j'utilise " + productId"
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

//Verification que les variables sont bien liées aux éléments HTML
console.log(itemImg.innerHTML); //Fonctionne grâce a document.querySelector et pas getDocumentsByClassName
console.log(itemTitle.innerHTML);
console.log(itemPrice.innerHTML);
console.log(itemDesc.innerHTML);
console.log(itemColor.innerHTML); //Est bien liée mais necessitais quelque chose (une boucle) en plus pour implémenter

//Fonction d'implémentation des données du produit en HTML
function displayProduct(product) {
    itemImg.innerHTML = `<img src=${product.imageUrl} alt="${product.altTxt}">`; //Problème réglé avec querySelector
    itemTitle.innerHTML = product.name;
    itemPrice.innerHTML = product.price;
    itemDesc.innerHTML = product.description;
    //Déclaration de la variable colorOptions (contenu du Array "colors" provenant du Array "product")
    const colorOptions = product.colors;
    console.log(colorOptions); //Affichage du Array "colors" dans le Array "product"
    //Implémentation des options dans l'HTML avec une boucle
    for (let i = 0; i < colorOptions.length; i++) {
        itemColor.innerHTML += `<option value="${colorOptions[i]}">${colorOptions[i]}</option>`; //Fonctionne (Nécessité absolue de créer une boucle for - ? fonctionne pas si rentrés un par un)
    }
    //Je n'arrive pas à rajouter un .catch(err)
}

//Fonction pour faire ajouter le produit au panier quand le bouton est cliqué
