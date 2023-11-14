const mongoose = require("mongoose");


const OrganisationSchema = new mongoose.Schema({

   
DirigeantId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
DirigeantNom: { type: String, required: true },

  NomOrganisation: { type: String, required: true },
  EmailOrganisation: { type: String, required: true },
  AdresseOrganisation: { type: String, required: true },
  TelOrganisation: { type: Number, required: true },
  image: { type: String, required: true },

    Effectif: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false }],



    status: { type: String, enum: ['Active', 'nonActive',], default: 'nonActive' }
  });
  
  // Create a Demand model from the schema
  module.exports = mongoose.model("Organisation", OrganisationSchema);