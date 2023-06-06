const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

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
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB', err);
    });

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use(cookieParser());
// Configuration d'express-session
app.use(
    session({
        secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Modifier à true si vous utilisez HTTPS
    })
);
// **** ROUTES GET **** //
app.get('/', (req, res) => {
    Candy.find({}).then((bonbons) => {
        res.render('pages/index', { panier: req.session.panier, bonbons: bonbons, user: req.session.user });
    });
});

app.get('/produits', (req, res) => {
    Candy.find({})
        .then((produits) => {
            res.render('pages/produits', { produits: produits, panier: req.session.panier, user: req.session.user});
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des produits :', err);
        });
});
app.get('/produits/:texture', (req, res) => {
    const texture = req.params.texture;
    Candy.find({'texture': texture})
        .then((produits) => {
            if(produits.length !== 0){
                res.render('pages/produits', { produits: produits, panier: req.session.panier, user: req.session.user});
            }else{
                res.status(404).render('pages/404');
            }
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des produits :', err);
        });
});
app.get('/produit/:productId', (req, res) => {
    // Récupérer les détails du produit depuis votre base de données
   Candy.findOne({id: req.params.productId}).then((product) => {
       if(req.session.addedPannier === undefined){
              req.session.addedPannier = false;
       }
       const addedPannier = req.session.addedPannier;
       req.session.addedPannier = false;
       res.render('pages/detailProduit', { product, addedPannier, panier: req.session.panier, user: req.session.user });
   }).catch((err) => {
         console.error('Erreur lors de la récupération du produit :', err);
       res.status(404).render('pages/404');
   });
});
app.get('/panier', (req, res) => {
    let panier = req.session.panier || [];
    res.render('pages/panier', { panier: panier, user: req.session.user });
});
app.get('/login', (req, res) => {
    if(req.session.user !== undefined){
        res.redirect('/');
    }
    res.render('pages/login', {error: undefined});
});
app.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

app.get('/commandes', (req, res) => {
    if(req.session.user !== undefined){
        Commande.find({idUser: req.session.user._id}).then((commandes) => {
            res.render('pages/commandes', {user: req.session.user, panier: req.session.panier, commandes: commandes});
        }).catch((err) => {
            console.error('Erreur lors de la récupération des commandes :', err);
        });
    } else {
        res.status(404).render('pages/404');
    }
});
app.get('/commande/:idCommande', (req, res) => {
    const idCommande = req.params.idCommande;
    Commande.findOne({id: idCommande}).populate('idUser').populate('idBonbon').then((commande) => {
        if(commande === null){
            res.status(404).render('pages/404');
        }else{
            res.render('pages/commande', {user: req.session.user, panier: req.session.panier, commande: commande});
        }
    }).catch((err) => {
        console.error('Erreur lors de la récupération de la commande :', err);
    });
});
app.get('/profile', (req, res) => {
    if(req.session.user === undefined){
        res.redirect('/');
    }
    res.render('pages/profile', {user: req.session.user, error: undefined, success: undefined, panier: req.session.panier});
});
app.get('/remerciement', (req, res) => {
    res.render('pages/remerciement');
});
// **** ROUTES POST **** //
app.post('/login', urlencodedParser, (req, res) => {
    // Récupérer les détails du produit depuis votre base de données
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then((user) => {
        if(user === null){
            res.render('pages/login', {error: 'email ou mot de passe incorrect'});
        }else{
            if(user.motDePasse === password){
                req.session.user = user;
                res.redirect('/');
            }else{
                res.render('pages/login', {error: 'email ou mot de passe incorrect'});
            }
            req.session.user = user;
        }
    }).catch((err) => {
        console.error('Erreur lors de la récupération du produit :', err);
        res.status(404).render('pages/404');
    });
});
app.post('/profile', urlencodedParser, (req, res) => {

    let localUser = req.session.user;

    if(localUser === undefined){
        res.redirect('/');
    }
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    const nom = req.body.name;
    const prenom = req.body.surname;
    const adresse = req.body.address;
    const ville = req.body.city;
    const codePostal = req.body.zipcode;

    User.findOne({email: localUser.email}).then((user) => {
        if(oldpassword !== '') {
            if(user.motDePasse === oldpassword) {
                if (newpassword === confirmpassword) {
                    user.motDePasse = newpassword;
                } else {
                    res.render('pages/profile', {
                        error: 'Les mots de passe ne sont pas identiques',
                        success: undefined,
                        user: req.session.user,
                        panier: req.session.panier
                    });
                }
            } else {
                res.render('pages/profile', {
                    error: 'L\'ancien mot de passe est incorrect',
                    success: undefined,
                    user: req.session.user,
                    panier: req.session.panier
                });
            }

        }
        user.nom = nom;
        user.prenom = prenom;
        user.adresse = adresse;
        user.ville = ville;
        user.codePostal = codePostal;
        user.save();
        req.session.user = user;
        res.render('pages/profile', {
            user: req.session.user,
            error: undefined,
            success: 'Les modifications ont bien été prises en compte',
            panier: req.session.panier
        });
    }).catch((err) => {
        console.error('Erreur lors de la récupération du produit :', err);
        res.status(404).render('pages/404');
    });

});
app.post("/panier", urlencodedParser, (req, res) => {
    //page qui ajoute un produit au panier
    const id = req.body.idBonbon;
    const quantity = req.body.quantity;

    const panier = req.session.panier || [];

    req.session.addedPannier = true;

    //ajouter le produit au panier
    Candy.findOne({id: id}).then((bonbon) => {
        let found = false;
        for(let i = 0; i < panier.length; i++){
            if(panier[i].id === id){
                panier[i].quantity = quantity;
                found = true;
            }
        }

        if(!found) panier.push({id, quantity,bonbon});
        req.session.panier = panier;

    }).catch((err) => {
        console.error('Erreur lors de la récupération du produit :', err);
        res.status(404).render('pages/404');
    }).then(() => {
        res.redirect(req.get('referer'));
    });
});
app.post("/panier/edit/:panierpos", jsonParser, (req, res) => {
    const panierpos = req.params.panierpos
    const quantity = req.body.quantity;
    let panier = req.session.panier || [];

    if(panier[panierpos] !== undefined || quantity > 0){
        panier[panierpos].quantity = quantity;
        req.session.panier = panier;
    }else if( quantity <= 0){
        panier.splice(panierpos, 1);
        req.session.panier = panier;
    }
    let total = 0;
    for(let i = 0; i < panier.length; i++){
        total += (panier[i].quantity * panier[i].bonbon.prix).toFixed(2);
    }
    total = total.toString().replace(/^0+/, '');
    res.send({total: total});
});
app.post("/order", urlencodedParser, (req, res) => {
    const panier = req.session.panier || [];
    const user = req.session.user;
    if(panier.length === 0){
        res.redirect('/');
    }
    if(user === undefined){
        res.redirect('/login');
    }
    let bonbons = [];
    let quantite = [];

    let total = 0;
    for(let i = 0; i < panier.length; i++){
        total += (panier[i].quantity * panier[i].bonbon.prix.toFixed(2));
        bonbons.push(panier[i].bonbon._id);
        quantite.push(panier[i].quantity);
    }
    total = total.toString().replace(/^0+/, '');
    let totalcommande = Commande.countDocuments({}).then((count) => {
        let commande = new Commande({
            id: count+1,
            idUser: user._id,
            idBonbon: bonbons,
            quantite: quantite,
            prix: total,
            date: new Date(),
            statut: 'En cours'
        });


        commande.save().then(() => {
            req.session.panier = [];
            res.redirect('/remerciement');
        }).catch((err) => {
            console.error('Erreur lors de la récupération du produit :', err);
            res.status(404).render('pages/404');
        });
    });


});

// **** ROUTES DELETE **** //
app.delete("/panier/delete/:panierpos", jsonParser, (req, res) => {
    const panierpos = req.params.panierpos
    let panier = req.session.panier || [];

    if(panier[panierpos] !== undefined){
        panier.splice(panierpos, 1);
        req.session.panier = panier;
    }
    let total = 0;
    for(let i = 0; i < panier.length; i++){
        total += (panier[i].quantity * panier[i].bonbon.prix).toFixed(2);
    }
    total = total.toString().replace(/^0+/, '');
    res.send({total: total});
});
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/pages/404.ejs');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


