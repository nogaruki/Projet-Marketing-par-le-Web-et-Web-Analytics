const express = require('express');
const Candy = require('./models/candy');
const User = require('./models/user');
const Commande = require('./models/commande');

const {join} = require("path");
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://johann:ibGjwEwAcwYHA1TN@clusterbonbon.5ui3sc8.mongodb.net/\n";
const collectionName = 'produits'; // Nom de la collection des bonbons

// Connectez-vous à votre base de données MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connecté à MongoDB');
        // Commande.find({})
        //     .populate('idUser')
        //     .populate('idBonbon')
        //     .then((commandes) => {
        //         console.log('Commandes récupérées :');
        //         for (const commande of commandes) {
        //             console.log('User',commande.idUser);
        //             console.log('Produits for i');
        //             for(let i =0; i < commande.idBonbon.length; i++){
        //                 console.log(commande.idBonbon[i]);
        //             }
        //             console.log('Produits for obj');
        //             for(const bonbon of commande.idBonbon){
        //                 console.log(bonbon);
        //             }
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Erreur lors de la recherche des commandes :', error);
        //     });
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB', err);
    });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/produits', (req, res) => {

    Candy.find({})
        .then((produits) => {
            console.log('Produits récupérés :', produits);
            res.render('pages/produits', { produits: produits });
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des produits :', err);
        });
});


app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/pages/404.ejs');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
