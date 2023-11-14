const Organisation = require("../models/OrganisationModel");
const User = require("../models/UserModel");
const cloudinary = require("../helper/imageUpload");

//--------------------------------------------cree une organisation--------------------------------------------
exports.createOrgan = async (req, res) => {
   const DirigeantId=req.params.id
 try {
    const {
        
        NomOrganisation,
        EmailOrganisation,
        AdresseOrganisation,
        TelOrganisation,
    
      } = req.body;
      const user=await User.findById(DirigeantId)
      if (!user) return res.json({success:false,message:'le dirigeant ne exist pas dans notre db il faut d abord ajouter un dirigeant'})
      if (user.UserType!=='Organisateur') return res.json({success:false,message:'le type de lutilisateur ne semble pas etre un dirigeant il faut d abord ajouter un dirigeant'})

    if(  !NomOrganisation||
        !EmailOrganisation||
        !AdresseOrganisation||
        !TelOrganisation
        )return res.json({success:false,message:'ya qlq chose qui manque'})


    const oldOrgan=await Organisation.findOne({EmailOrganisation})
    if (oldOrgan) return res.json({success:false,message:'organisation exist deja avec cette email'})
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "organisation",
      public_id: `user_${DirigeantId}_${Date.now()}_organisation`,
      width: 500,
      height: 500,
      crop: "fill",
    });
console.log(result)
    const organisation=new Organisation(

     {  DirigeantId:user._id,
        DirigeantNom:user.fname+" "+user.lname,
        NomOrganisation,
        TelOrganisation,
        EmailOrganisation,
        AdresseOrganisation,
        image:result.url,
      }
    )
    console.log(organisation)
    
    await organisation.save()
    await User.updateOne(
      {_id: DirigeantId},
       { organisationId:organisation._id } ,
       { new: true }
     );

    res.json({success:true,message:'organisation cree avec success',data:organisation})
 } catch (error) {
    res.json({success:false,message:'error lors de la creation'})

 }

};

exports.getAllOrgan=async(req,res)=>{
   try {
     const organisation= await Organisation.find({});
 
     res.status(200).json({ data: organisation, success: true });
   } catch (error) {
     console.log(error);
   }
 }
 exports.getAllOrganByuser=async(req,res)=>{
   const id=req.params.id
   try {
   
     const organ= await Organisation.findOne({DirigeantId:id});
     res.json({ data: organ, success: true });
   } catch (error) {
     console.log(error);
   }
 }