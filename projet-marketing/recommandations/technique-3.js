const _ = require('lodash');

// Fonction de recommandation de bonbons populaires
function recommanderBonbonsPopulaires(historiqueAchats, commandeActuelle) {
    // On rassemble tous les produits achetés par tous les clients
    const tousLesProduits = _.flatMap(historiqueAchats, produits => produits.map(produit => produit.toString()));

    // On compte le nombre d'occurrences de chaque produit
    const produitsComptes = _.countBy(tousLesProduits);

    // On trie les produits par ordre décroissant de nombre d'occurrences
    const produitsPopulaires = _.orderBy(_.keys(produitsComptes), produit => produitsComptes[produit], 'desc');
    console.log("recommandation avant", produitsPopulaires);
    // On retire les produits déjà présents dans la commande actuelle
    const recommandations = _.difference(produitsPopulaires, commandeActuelle.produits.map(produit => produit.bonbon._id.toString()));
    console.log("recommandation apres", recommandations);
    
    return recommandations;
}

module.exports = recommanderBonbonsPopulaires;
