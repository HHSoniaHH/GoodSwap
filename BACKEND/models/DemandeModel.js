const mongoose = require("mongoose");


const DemandeSchema = new mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    adopteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    donneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },

    adopteurNom: { type: String, required: true },
    donnateurNom: { type: String, required: true },
    ArticleNom: { type: String, required: true },

    status: { type: String, enum: ['Attente', 'Accepter', 'Refuse'], default: 'Attente' }
  });
  
  // Create a Demand model from the schema
  module.exports = mongoose.model("Demande", DemandeSchema);
