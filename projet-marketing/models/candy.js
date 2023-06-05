const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    gout: {
        type: String,
        required: true
    },
    couleur: {
        type: String,
        required: true
    },
    texture: {
        type: String,
        required: true
    },
    forme: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Candy = mongoose.model('Candy', candySchema);

module.exports = Candy;
