const _ = require('lodash');

// Fonction de recommandation content-based
function recommanderProduitsSimilaires(bonbon, bonbons, panier) {
    // On filtre les bonbons qui ont des caractéristiques similaires à celles du bonbon donné
    let bonbonsSimilaires;
    bonbonsSimilaires = _.filter(bonbons, autreBonbon => {
        const similarite = (_.isEqual(bonbon.couleur, autreBonbon.couleur) ? 1 : 0)
            + (_.isEqual(bonbon.gout, autreBonbon.gout) ? 1 : 0)
            + (_.isEqual(bonbon.texture, autreBonbon.texture) ? 1 : 0)
            + (_.isEqual(bonbon.forme, autreBonbon.forme) ? 1 : 0);
        /*console.log("Bonbon actuel :", bonbon);
        console.log("Autre bonbon :", autreBonbon);
        console.log("Similarité :", similarite);*/
        return similarite >= 2; // On conserve tous les bonbons pour l'affichage
    });
    //console.log("bonbonsSimilaires", bonbonsSimilaires);

    // On trie les bonbons par ordre décroissant de nombre de caractéristiques similaires
    const bonbonsRecommandes = _.orderBy(bonbonsSimilaires, 'similarite', 'desc');

    // On retire le bonbon donné de la liste des recommandations
    const rec =  _.differenceBy(bonbonsRecommandes.slice(0, 4), [bonbon], 'id');
    //console.log("recommandation avant", rec)
    //console.log(panier.produits);
    // On retire les bonbons déjà présents dans le panier
    const recommandations = _.differenceWith(rec, panier.produits, (recommandation, produitPanier) => {
        return _.isEqual(recommandation._id, produitPanier.bonbon._id) || _.isEqual(recommandation.id, produitPanier.bonbon.id);
    });

    //console.log("recommandation apres", recommandations)
    return recommandations;
}

module.exports = recommanderProduitsSimilaires;
