const Catigorie = require("../models/CatigorieModel");

//--------------------------------------cree une catigorie----------------------------------------
exports.createCat = async (req, res) => {
  
  try {
     const {
         
        NomCatigorie
         
     
       } = req.body;
       const OldCatigorie=await Catigorie.findOne({NomCatigorie})
       if (OldCatigorie) return res.json({success:false,message:'la catigorie exist deja avec ce nom'})
 
 
     
     const catigorie=new Catigorie(
 
      {  NomCatigorie
       }
     )
     console.log(catigorie)
     await catigorie.save()
     res.json({success:true,message:'catigorie cree avec success',catigorie})
  } catch (error) {
     res.json({success:false,message:'error lors de la creation'})
 
  }
 
 };
 

 //----------------------------------recuperer tous les cat--------------------------------------
exports.getAllcat = async (req, res) => {
   try {
     const cat = await Catigorie.find({});
 
     res.json({ data: cat, success: true });
   } catch (error) {
     console.log(error);
   }
 };