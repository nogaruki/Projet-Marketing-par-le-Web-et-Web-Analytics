const _ = require('lodash');

function recommanderProduitsSimilaires(historiqueAchatsSimilaire, commandeActuelle) {

  const clientsSimilaires = _.filter(historiqueAchatsSimilaire, client => {
    const clientProduitsIds = _.flatMap(client, id => id.toString());
    //console.log("clientProduitsIds", clientProduitsIds);
    const commandeProduitsIds = _.map(commandeActuelle.produits, 'bonbon._id');
    //console.log("commandeProduitsIds", commandeProduitsIds);
    return _.intersection(clientProduitsIds, commandeProduitsIds).length > 0;
  });

  //console.log("clients similaires", clientsSimilaires)

    const produitsSimilaires = _.flatMap(clientsSimilaires, client => {
      let produits = client;
      let produitsCommande = commandeActuelle.produits;
      let produitsRecommandes = [];

      for (let i = 0; i < produits.length; i++) {
        let produit = produits[i];
        let produitExiste = false;

        for (let j = 0; j < produitsCommande.length; j++) {
          let produitCommande = produitsCommande[j];
          if (String(produit) === String(produitCommande._id)) {
            produitExiste = true;
            break;
          }
        }

        if (!produitExiste) {
          produitsRecommandes.push(produit);
        }
      }

      return produitsRecommandes;
    });
    //console.log("produits similaires", produitsSimilaires);


  const produitsComptes = _.countBy(produitsSimilaires, String);
  //console.log("produits comptes", produitsComptes);

    const produitsRecommandes = _.orderBy(_.keys(produitsComptes), produit => {
      return produitsComptes[produit];
    }, 'desc');

    //const reco =  _.difference(produitsRecommandes, _.map(commandeActuelle.produits, '_id'));
  const reco = _.difference(produitsRecommandes, commandeActuelle.produits.map(produit => produit.bonbon._id.toString()));
  //console.log("recommandation", reco.length);
    return reco;
  }

  module.exports = recommanderProduitsSimilaires;
