
const _ = require('lodash');

const recommanderProduits = (historiqueAchats, commandeActuelle) => {
    // Vérifier si l'utilisateur a un historique d'achats
    const utilisateur = historiqueAchats.find(
      (client) => client.id === commandeActuelle.id
    );
    if (!utilisateur || !utilisateur.produits.length) {
      console.log("L'utilisateur n'a pas d'historique d'achats.");
      return [];
    }
  
    // Trouver les produits les plus achetés par l'utilisateur
    const produitsLesPlusAchetes = _(utilisateur.produits)
      .groupBy("nom")
      .map((produits, nom) => ({
        nom,
        quantite: _.sumBy(produits, "quantite"),
      }))
      .orderBy("quantite", "desc")
      .value();
  
    // Filtrez les produits recommandés pour éviter les doublons dans la commande actuelle
    const recommandations = _.differenceWith(
      produitsLesPlusAchetes,
      commandeActuelle.produits,
      (produit1, produit2) => produit1.nom === produit2.nom
    );
  

    let produitsRecommandes = [];
    for (let i = 0; i < recommandations.length; i++) {
        produitsRecommandes.push(recommandations[i].nom);
    }
    console.log("Les recommandations sont :", produitsRecommandes);

    return produitsRecommandes;
  };

  module.exports = recommanderProduits;
  