const recommandationBaséeSurHistorique = require("./technique-2");

describe("recommanderProduits", () => {
    const historiqueAchats = require('./historiqueAchats.json');
    const commandeActuelle = require('./commandeActuelle.json');
    
    test("renvoie un tableau de produits recommandés pour l'utilisateur existant avec un historique d'achats", () => {
        const recommandations = recommandationBaséeSurHistorique(historiqueAchats, commandeActuelle);
        expect(recommandations).toEqual(["Schtroumpf", "Banane"]);
      });
      

});