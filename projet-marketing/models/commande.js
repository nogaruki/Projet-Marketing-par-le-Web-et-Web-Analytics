const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandeSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idBonbon: [{
        type: Schema.Types.ObjectId,
        ref: 'Candy',
        required: true
    }],
    quantite: [{
        type: Number,
        required: true
    }],
    prix: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    statut: {
        type: String,
        required: true
    },
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;