const _ = require('lodash');
// Fonction de recommandation de bonbons populaires
function recommanderBonbonsPopulaires(historiqueAchats, commandeActuelle) {
    // On rassemble tous les produits achetés par tous les clients
    const tousLesProduits = _.flatMap(historiqueAchats, client => {
        return client.produits;
        //console.log("tousLesProduits", tousLesProduits)
    });

    // On compte le nombre d'occurrences de chaque produit
    const produitsComptes = _.countBy(tousLesProduits, 'id');
    //console.log("produitsComptes", produitsComptes)

    // On trie les produits par ordre décroissant de nombre d'occurrences
    const produitsPopulaires = _.orderBy(_.keys(produitsComptes), produit => {
        return produitsComptes[produit];
    }, 'desc');
    const deuxProduitsPopulaires = produitsPopulaires.slice(0, 3); // extraire les 2 premiers éléments du tableau trié
    //console.log("deuxProduitsPopulaires", deuxProduitsPopulaires)
    // On retire les produits déjà présents dans la commande actuelle
    return _.difference(deuxProduitsPopulaires, _.map(commandeActuelle.produits, 'id'));
}

module.exports = recommanderBonbonsPopulaires;