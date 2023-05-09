const recommanderProduitsSimilaires = require('./technique-1');

describe('recommanderProduitsSimilaires', () => {
    // Les données d'historique d'achats des clients et de la commande actuelle du client
    const historiqueAchats = require('./historiqueAchats.json');
    const commandeActuelle = require('./commandeActuelle.json');
  
    test('recommande des produits similaires', () => {
      const produitsRecommandes = recommanderProduitsSimilaires(historiqueAchats, commandeActuelle);
      expect(produitsRecommandes).toEqual(['Banane', 'Dragibus']);
        // on affiche les produits recommandés
        console.log("Les recommandations sont :", produitsRecommandes);
    });
  
    test('ne recommande pas de produits déjà dans la commande actuelle', () => {
      // Ajoutons le produit 'Caramel' à la commande actuelle pour tester l'exclusion
      commandeActuelle.produits.push({ id: 'Caramel', nom: 'Caramel', prix: 0.2, quantite: 1 });
      const produitsRecommandes = recommanderProduitsSimilaires(historiqueAchats, commandeActuelle);
      expect(produitsRecommandes).not.toEqual(['Caramel', 'Tagada']);
    });
  });
  