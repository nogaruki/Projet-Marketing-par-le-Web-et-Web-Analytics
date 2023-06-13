const _ = require('lodash');

function recommanderProduits(historiqueAchatsUser, commandeActuelle) {
    if (!historiqueAchatsUser || historiqueAchatsUser.length === 0) {
        console.log("L'utilisateur n'a pas d'historique d'achats.");
        return [];
    }

    const produitsRecommandes = historiqueAchatsUser.reduce((recommandations, client) => {
        client.forEach(produit => {
            const produitExiste = commandeActuelle.produits.some(produitCommande => String(produit) === String(produitCommande.bonbon._id));
            if (!produitExiste) {
                recommandations.push(produit);
            }
        });
        return recommandations;
    }, []);

    const produitsComptes = _.countBy(produitsRecommandes, String);
    console.log("produits comptes", produitsComptes);
    const produitsRecommandesTri = _.orderBy(_.keys(produitsComptes), produit => {
        return produitsComptes[produit];
    }, 'desc');

    const reco = _.difference(produitsRecommandesTri.slice(0, 4), commandeActuelle.produits.map(produit => produit.bonbon._id.toString()));

    console.log("recommandation", reco);
    return reco;
}

module.exports = recommanderProduits;
