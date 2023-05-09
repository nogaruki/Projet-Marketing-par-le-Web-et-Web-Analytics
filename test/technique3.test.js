const recommanderBonbonsPopulaires = require('./technique-3');

describe('recommanderBonbonsPopulaires', () => {
    // Le catalogue de produits et la commande actuelle du client
    const historiqueAchats = require('./historiqueAchats.json');
    const commandeActuelle = require('./commandeActuelle.json');

    test('recommande des bonbons populaires', () => {
        const bonbonsRecommandes = recommanderBonbonsPopulaires(historiqueAchats, commandeActuelle);
        expect(bonbonsRecommandes).toEqual(['Banane', 'Dragibus']);
        // On affiche les bonbons recommandés
        console.log("Les recommandations sont :", bonbonsRecommandes);
    });

    test('ne recommande pas de bonbons déjà dans la commande actuelle', () => {
        // Ajoutons le bonbon 'Dragibus' à la commande actuelle pour tester l'exclusion
        commandeActuelle.produits.push({ id: 'Dragibus', nom: 'Dragibus', prix: 1.5, quantite: 2 });
        const bonbonsRecommandes = recommanderBonbonsPopulaires(historiqueAchats, commandeActuelle);
        expect(bonbonsRecommandes).not.toEqual(['Dragibus', 'Tagada']);
    });
});
