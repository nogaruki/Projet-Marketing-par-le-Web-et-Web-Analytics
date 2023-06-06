const _ = require('lodash');

// Les données d'historique d'achats des clients et de la commande actuelle du client

// Fonction de recommandation content-based
function recommanderProduitsSimilaires(historiqueAchats, commandeActuelle) {
  // On filtre les clients qui ont acheté des produits similaires à ceux dans la commande actuelle
  const clientsSimilaires = _.filter(historiqueAchats, client => {
    return _.intersectionBy(client.produits, commandeActuelle.produits, 'id').length > 0;
  });

  // On rassemble tous les produits achetés par les clients similaires
  const produitsSimilaires = _.flatMap(clientsSimilaires, client => {

    let produits = client.produits;
    let produitsCommande = commandeActuelle.produits;
    let produitsRecommandes = [];
    // supprimer les produits de la variable produits qui sont dans la variable produitsCommande
    for (let i = 0; i < produits.length; i++) {
      let produit = produits[i];
      let produitExiste = false;
      for (let j = 0; j < produitsCommande.length; j++) {
        let produitCommande = produitsCommande[j];
        if (produit.id === produitCommande.id) {
          produitExiste = true;
          break;
        }
      }
      if (!produitExiste) {
        produitsRecommandes.push(produit);
      }

    }

    return produitsRecommandes;
    //console.log("produitsSimilaires", produitsSimilaires)
  });

  // On compte le nombre d'occurrences de chaque produit
  const produitsComptes = _.countBy(produitsSimilaires, 'id');

  // On trie les produits par ordre décroissant de nombre d'occurrences
  const produitsRecommandes = _.orderBy(_.keys(produitsComptes), produit => {
    return produitsComptes[produit];
  }, 'desc');

  // On retire les produits déjà présents dans la commande actuelle
  return _.difference(produitsRecommandes, _.map(commandeActuelle.produits, 'id'));

}

module.exports = recommanderProduitsSimilaires;