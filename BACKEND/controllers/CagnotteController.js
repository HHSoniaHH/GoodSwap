const CagnotteModel = require("../models/CagnotteModel");
const User = require("../models/UserModel");
const cloudinary = require("../helper/imageUpload");
const OrganisationModel = require("../models/OrganisationModel");

//------------------------creation d'un cagnotte-----------------------+----------------------
exports.createCagnotte = async (req, res) => {
  const id = req.params.id;
  try {
    const { Titre,description, Somme } = req.body;
    if (!Titre || !Somme || !description)
      return res.json({ success: false, message: "qlq chose qui manque  " });
    const organisation = await OrganisationModel.findById(id)
    if (!organisation) return res.json({ success: false, message: "organisation non trouve " });
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cagnotte",
      public_id: `user_${id}_${Date.now()}_cagnotte`,
      width: 500,
      height: 500,
      crop: "fill",
    });
console.log(result)
    const cagnotte = new CagnotteModel({
      createdById: id,
      createdByName: organisation.NomOrganisation,
      description,
      Titre,
      Somme,
      image:result.url,
    });
    await cagnotte.save();
    res.json({
      success: true,
      message: "Cagnotte lancé avec succées ",
      data: cagnotte,
    });
  } catch (error) {
    res.json({ success: false, message: "error ", error });
  }
};
//-----------------------Faire un don aux Cagnottes-----------------------------------------------

exports.FaireUnDon = async (req, res) => {
  const id = req.params.id;
  try {
    const cagnotte = await CagnotteModel.findById(id);
    const { idDonnateur, Montant } = req.body;
    // const ikhdemDeja = cagnotte.Donnateurs.find(d => d.idDonnateur.toString() === idDonnateur);
    // const ancienMontan= ikhdemDeja.Montant;
    if (cagnotte.MontantActuel + Montant >= cagnotte.Somme) {
      const RestPourCompleter = cagnotte.Somme - cagnotte.MontantActuel;
      const MonieMontant=Montant - RestPourCompleter
      const Rest = Montant - MonieMontant;
      cagnotte.MontantActuel += Rest;

      const donnateur = {
        idDonnateur: idDonnateur,
        Montant: Montant,
      };

      cagnotte.status='Atteint'
      const interet =cagnotte.interet+MonieMontant;
      await CagnotteModel.updateOne(
        {_id:id},
        {status:cagnotte.status,interet:interet, $push: { Donnateurs:donnateur } },
     
      );
      await cagnotte.save();

      return res.json({
        message: `La somme éspérées est acomplies merci beaucoup  voila votre reste ${MonieMontant}`,
        success: true,
      });
    }

    cagnotte.MontantActuel += Montant;
    const donnateur = {
      idDonnateur: idDonnateur,
      Montant: Montant,
    };

    await CagnotteModel.updateOne(
     {_id: id},
      { $push: { Donnateurs:donnateur } },
      { new: true }
    );


    await cagnotte.save();

    return res.json({ message: " merci beaucoup", success: true });
  } catch (error) {
    return res.json({ message: " err rrr", success: false });
  }
};




exports.getAllCagnotte=async(req,res)=>{
  try {
    const cagnotte= await CagnotteModel.find({});

    res.status(200).json({ data: cagnotte, success: true });
  } catch (error) {
    console.log(error);
  }
}
exports.getAllCagnotteByuser=async(req,res)=>{
  const id=req.params.id
  try {
  
    const cagnotte= await CagnotteModel.find({createdById:id});
    res.json({ data: cagnotte, success: true });
  } catch (error) {
    console.log(error);
  }
}