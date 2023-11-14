const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prix: {
    type:Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,

  },
  type: {
    type: String,
    required: true,
    enum: ["don", "echange"],
    default: "don",
  },
  image: {
    type: String,
    required: true,
  },
  catigorie: {  type: String,
    required: true, },


  status: {
    type: String,
    enum: ["Reserver", "Recuperer", "Disponible"],
    default: "Disponible",
    required: true,
  },
  demande: {
    type: String,
    enum: ["Accepté", "Refusé"],
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    
  },adoptedBy:{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }
  ,auteur:{
    type:String,
    required:false
  },
 //si je ne cree pas la table demande

  // demandes: [{
  //   articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  //   adopteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  //   donneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },

  //   adopteurNom: { type: String, required: true },
  //   status: { type: String, enum: ['Attente', 'Accepter', 'Refuse'], default: 'Attente' }
  // }]
});
module.exports = mongoose.model("articles", ArticleSchema);
