//Fonction de stockage du panier dans localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); //Passage en JSON du array du panier (localStorage ne peut pas stocker de tableaux complexes (non-JSON));
}

//Fonction de recupération du panier stocké dans localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        return []; //Si le array du panier n'existe pas -> création d'un array vide
    }else{
        return JSON.parse(cart); //Si le array existe -> récupère le array en JSON et le parse en object
    }
}

//Fonction d'ajout de produit au panier
function addCart(product) {
    let cart = getCart(); //Récupère le panier
    let foundProduct = cart.find(p => p.id == product.id); //Vérifie s'il y à déjà un produit identique dans le panier 
    if (foundProduct != undefined) {
        foundProduct.quantity++; //Si déjà dans le panier -> ajoute 1 à la quantité
    }else{
        product.quantity = 1; //Si pas encore dans le panier -> donner quantité de 1
        cart.push(product); //Met le produit dans le panier (push)
    }
    saveCart(cart); //Sauvegarde le panier avec le produit dedans
}

//Fonction de retrait de produit du panier
function removeFromCart(product) {
    let cart = getCart(); //Récupère le panier
    cart = cart.filter(p => p.id != product.id); //Cible le produit et le supprime
    saveCart(cart); //Sauvegarde le panier une fois le produit retiré
}

//Fonction de changement de quantité
function changeQuantity(product, quantity) {
    let cart = getCart(); //Récupère le panier
    let foundProduct = cart.find(p => p.id == product.id); //Vérifie s'il y à déjà un produit identique dans le panier 
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity; //Change la quantité du produit 
        if(foundProduct.quantity <= 0){
            removeFromCart(foundProduct); //Si la quantité générée est inférieure ou égale à zéro -> le produit est supprimé du panier
        }else{
            saveCart(cart); //Sauvegarde le panier avec la quantité de produit changée
        }
    }
}

//Fonction de calcul de la quantité de produits dans le panier
function getNumberProduct() {
    let cart = getCart(); //Récupère le panier
    let number = 0;
    for(let product of cart) {
        number += product.quantity;
    }
    return number; //Donne la quantité
}

//Fonction de calcul du prix total du panier
function getTotalPrice(){
    let cart = getCart(); //Récupère le panier
    let total = 0;
    for(let product of cart) {
        total += product.quantity * product.price; //Multiplie la quantité de produits par leurs prix
    }
    return total; //Donne le prix total
}