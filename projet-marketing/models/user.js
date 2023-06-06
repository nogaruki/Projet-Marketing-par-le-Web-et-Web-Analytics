const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    codePostal: {
        type: Number,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
