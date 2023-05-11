const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Refrigerante = new Schema({
  marca: {
    type: String
  },
  quantidade: {
    type: String
  },
  tipoGarrafa: {
    type: String
  }
},{
    collection: 'refrigerante'
});

module.exports = mongoose.model('Refrigerante', Refrigerante);