//Fonction de stockage du panier dans localStorage
function saveCart(cart) {
    localStorage.setItem("cart", cart);
}

//Fonction de recupération du panier stocké dans localStorage
function getCart() {
    localStorage.getItem("cart");
}