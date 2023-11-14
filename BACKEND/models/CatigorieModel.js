const mongoose = require("mongoose");


const CatigorieSchema = new mongoose.Schema({

   


  NomCatigorie: { type: String, required: true },
 


    Articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles', required: false }
  ],



  });
  
  // Create a Demand model from the schema
  module.exports = mongoose.model("catigorie", CatigorieSchema);