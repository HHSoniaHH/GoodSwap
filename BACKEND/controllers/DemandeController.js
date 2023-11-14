const Article = require("../models/ArticleModel");
const Demande = require("../models/DemandeModel");
const User = require("../models/UserModel");
const user = require("../models/UserModel");
const { GenerateEmailRejeter, mailTransport } = require("../utils/mail");


//---------------------------------------Creer un demande de don----------------------------------------------
exports.createDemande = async (req, res) => {
  try {
    const { adopteurId, donneurId, articleId } = req.body;
    const article = await Article.findById(articleId);
    const AdopteurUser = await User.findById(adopteurId);
    const DonneurUser = await User.findById(donneurId);
    const Olddemande = await Demande.findOne({
      adopteurId: adopteurId,
      articleId: articleId,
    });

    if (Olddemande)
      return res.json({
        success: false,
        message: "Vous avez déja demandé cette article",
      });
    if (!article)
      return res.json({ success: false, message: "Article non trouve" });
    if (!AdopteurUser)
      return res.json({ success: false, message: "Adopteur non trouve" });

    if (!DonneurUser)
      return res.json({ success: false, message: "Donneur non trouve" });

    // if(article.createdBy!==donneurId) return res.json({success:false,message:'cette '})
    if (adopteurId === donneurId)
      return res.json({ success: false, message: "vous ete le meme " });

    // if(!article.status==='re') return res.json({success:false,message:'Donneur non trouve'})

    const demande = await Demande({
      adopteurId,
      donneurId,
      articleId,
      adopteurNom: AdopteurUser.fname + " " + AdopteurUser.lname,
      donnateurNom: DonneurUser.fname + " " + DonneurUser.lname,
      ArticleNom: article.nom,
    });

    await demande.save();

    //si je ne cree pas la table demande
    // article.demandes.push({
    //     adopteurId:adopteurId,
    //     donneurId:donneurId,
    //     articleId:articleId,
    //     adopteurNom: AdopteurUser.fname + "" + AdopteurUser.lname,
    // });
    // await article.save();
    res
      .status(201)
      .json({ success: true, message: "demanade crée avec succéss", demande });
  } catch (error) {
    res.status(500).json({ success: false, message: "error lors de creation" });
  }
};
//---------------------------------------Accpter la demande de don----------------------------------------------
exports.AccepteDemande = async (req, res) => {
  const id = req.params.id;
  const { articleId } = req.body;

  try {
    const demande = await Demande.findById(id);
    const article = await Article.findById(articleId);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!article)
      return res.json({ success: false, message: "article non trouve" });

    demande.status = "Accepter";
    article.status = "Reserver";

    await Demande.updateOne({ _id: id }, { status: demande.status });
    await Article.updateOne({ _id: articleId }, { status: article.status });

    res.json({
      success: true,
      message: "Article reservée avec succéss",
      demande,
      article,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error reservée" });
  }
};
//---------------------------------------Refuser la demande de don----------------------------------------------
exports.AnnulerMaDemande = async (req, res) => {
  const id = req.params.id;
  const { adopteurId, articleId } = req.body;

  try {
    const demande = await Demande.findById(id);
    const AdopteurUser = await User.findById(adopteurId);
    const article = await Article.findById(articleId);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!AdopteurUser)
      return res.json({ success: false, message: "Adopteur non trouve" });
    if (!article)
      return res.json({ success: false, message: "Article non trouve" });


    await Demande.findByIdAndDelete(id);

    res.json({ success: true, message: "la demande annuler" });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};
//---------------------------------------Refuser la demande de don----------------------------------------------
exports.RefuseDemande = async (req, res) => {
  const id = req.params.id;
  const { adopteurId, articleId } = req.body;

  try {
    const demande = await Demande.findById(id);
    const AdopteurUser = await User.findById(adopteurId);
    const article = await Article.findById(articleId);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!AdopteurUser)
      return res.json({ success: false, message: "Adopteur non trouve" });
    if (!article)
      return res.json({ success: false, message: "Article non trouve" });

    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: AdopteurUser.email,
      subject: "Demeande de don rejeté ",
      html: GenerateEmailRejeter(demande.adopteurNom, article.nom),
    });
    await Demande.findByIdAndDelete(id);

    res.json({ success: true, message: "la demande refusé" });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};
//--------------------------Finaliser la procedure de donnations une fois l'adopteur recupere son don ----------------------------------------------
exports.FinaleserDemande = async (req, res) => {
  const id = req.params.id;
  const { articleId } = req.body;

  try {
    const demande = await Demande.findById(id);
    const article = await Article.findById(articleId);
    const user = await User.findById(demande.donneurId);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!article)
      return res.json({ success: false, message: "article non trouve" });
      if (!user)
      return res.json({ success: false, message: "user non trouve" });
    // article.demandes=[]
     const smile = user.smiles+5;
    article.status = "Recuperer";
    article.adoptedBy = demande.adopteurId;
 
    await User.findByIdAndUpdate(user._id,{smiles:smile},{new:true})
    await Demande.deleteMany({ articleId: articleId });
    await Article.updateOne({ _id: articleId }, { status: article.status ,adoptedBy:article.adoptedBy });

    //si je ne cree pas la table demande

    // await Article.updateOne({ _id: articleId }, { status: article.status,  demandes:article.demandes });

    res.json({
      success: true,
      message: "Article Récuperer avec succéss",
      article,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};

//-------------------------------------recuperer tous les demandes----------------------------------------------------------
exports.getAlldemande = async (req, res) => {
  try {
    const demande = await Demande.find({});

    res.json({ data: demande, success: true });
  } catch (error) {
    console.log(error);
  }
};
//------------------------------recuperer tous les demandes par rapport au  adopteur----------------------------
exports.getAlldemandeByAdopteur = async (req, res) => {
  try {
    const id = req.params.id;

    const demande = await Demande.find({ adopteurId: id });

    res.status(200).json({ data: demande });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
//---------------------------------recuperer tous les demandes par rapport au donnateur------------------------------------------
exports.getAlldemandeByDonnateur = async (req, res) => {
  try {
    const id = req.params.id;

    const demande = await Demande.find({ donneurId: id });

    res.status(200).json({ data: demande });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
