//Récupérer l'id HTML a modifier

const itemsCards = document.getElementById("items"); //Création d'une variable pour la section HTML des cartes produits
//console.log(itemsCards.innerHTML); //Vérification en log que la section HTML à bien été récupérée

//Récupérer le Array des produits au format JSON avec fetch et l'afficher dans la console

fetch("http://localhost:3000/api/products") //Fetch du array des données produits
    .then(function(productsCards) {
        if (productsCards.ok) {
            return productsCards.json(); //Passage en JSON du array des données produits
        }
    })
    .then(function(value) {
        //console.log(value); //Vérification que la valeur de la fonction contient bien le Array
        const productsCards = value; //Création de la variable productCards contenant le resultat de la fonction (le Array)
        //console.table(productsCards); //Vérification que le Array est bien récupéré par fetch en l'affichant dans la console en format .table (Plus de visibilité que .log)
        //Création d'une boucle pour implémenter le JSON dans l'HTML
        for (let i = 0; i < productsCards.length; i++) {
            itemsCards.innerHTML += `
            <a href="./product.html?id=${productsCards[i]._id}">
            <article>
                <img src="${productsCards[i].imageUrl}" alt="${productsCards[i].altTxt}">
                <h3 class="productName">${productsCards[i].name}</h3>
                <p class="productDescription">${productsCards[i].description}</p>
            </article>
            </a>`
        }
    })
    //Au cas où un disfonctionnement se produit, réaction à l'erreur
    .catch(function(err) {
        console.log("An error as occured") //Affichage dans la console du malfonctionnement
        itemsCards.innerHTML = "An error as occured and products cannot be displayed for now, please try again later." //Affichage sur l'interface utilisateur du malfonctionnement
    });
