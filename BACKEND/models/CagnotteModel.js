const mongoose = require("mongoose");

const CagnotteSchema = new mongoose.Schema({
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdByName: { type: String, required: true },
  Titre: { type: String, required: true },
  Somme: {
    type: Number,
  


    required: true,
  }
  ,
  image:{ type: String, required: false },
  description:{ type: String, required: true },
  MontantActuel: {
    type: Number,
 
    default: 0,
    required: true,
  },
   interet: {
    type: Number,
 
    default: 0,
    required: false,
  },
  status: { type: String, enum: ['Atteint', 'Non Atteint'], default: 'Non Atteint' },
  Donnateurs: [
{    idDonnateur:{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: false }
,  Montant: {
    type: Number,
 
    default: 0,
    required: true,
  }
 

}  ],
});

// Create a Demand model from the schema
module.exports = mongoose.model("cagnotte", CagnotteSchema);
