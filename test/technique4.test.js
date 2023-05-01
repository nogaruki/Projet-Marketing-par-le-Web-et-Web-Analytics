const recommanderProduitsSimilaires = require('./technique-4');

describe('recommanderProduitsSimilaires', () => {
    // Les données des bonbons et des caractéristiques
    const bonbonListe = require('./bonbonListe.json');

    test('recommande des produits similaires', () => {
        const bonbonNom = 'Bonbon A';
        const bonbon = bonbonListe.find(bonbon => bonbon.nom === bonbonNom);
        const nomsRecommandes = recommanderProduitsSimilaires(bonbon).map(bonbon => bonbon.nom);
        expect(nomsRecommandes).toEqual(['Bonbon C']);
        // on affiche les noms des bonbons recommandés ainsi que leur similarité
        //console.log("Les recommandations sont :", nomsRecommandes );
    });
});
