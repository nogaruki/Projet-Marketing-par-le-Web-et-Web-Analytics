const _ = require('lodash');

// Fonction de recommandation content-based
function recommanderProduitsSimilaires(bonbon, bonbons) {
    // On filtre les bonbons qui ont des caractéristiques similaires à celles du bonbon donné
    const bonbonsSimilaires = _.filter(bonbons, autreBonbon => {
        const similarite = (_.isEqual(bonbon.couleur, autreBonbon.couleur) ? 1 : 0)
            + (_.isEqual(bonbon.gout, autreBonbon.gout) ? 1 : 0)
            + (_.isEqual(bonbon.texture, autreBonbon.texture) ? 1 : 0)
            + (_.isEqual(bonbon.forme, autreBonbon.forme) ? 1 : 0);
        return similarite //>= 2; // on conserve les bonbons ayant au moins deux caractéristiques similaires
        //console.log("bonbonsSimilaires : ", bonbonsSimilaires + "similarite : ", similarite);
    });

    // On trie les bonbons par ordre décroissant de nombre de caractéristiques similaires
    const bonbonsRecommandes = _.orderBy(bonbonsSimilaires, 'similarite', 'desc');
    //console.log("bonbonsRecommandes", bonbonsRecommandes);

    // On retire le bonbon donné de la liste des recommandations
    return _.differenceBy(bonbonsRecommandes, [bonbon], 'id');
}

module.exports = recommanderProduitsSimilaires;
