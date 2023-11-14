const Article = require("../models/ArticleModel");
const cloudinary = require("../helper/imageUpload");
const CatigorieModel = require("../models/CatigorieModel");





//-------------------------------------------creer un article-------------------------------------------------
exports.createArticle = async (req, res) => {
try {
  const { user } = req;
 
  const { nom, prix, type, catigorie, desc } = req.body;
  if (!nom || !prix  || !catigorie || !desc) {
    res.status(400).json({ success: false, message: "un element manque" });
  }
  const oldPost= await Article.findOne({nom})
  if(oldPost){
   return res.status(403).json({ success: false, message: "Article existe deja avec ce nom" });

  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "article",
    public_id: `user_${user._id}_${Date.now()}_article`,
    width: 500,
    height: 500,
    crop: "fill",
  });
  console.log(result);
  const article = await Article({
    nom,
    prix,
    type,
    image:result.url,
    catigorie,
    desc,
    createdBy: user._id,
    auteur:user.fname +' '+ user.lname
  });
  const catNom=await CatigorieModel.findOne({NomCatigorie:article.catigorie})

  await article.save();
  console.log(catNom)
  await CatigorieModel.findByIdAndUpdate(catNom._id,{  $push: { Articles: article }  },{new :true}
    )
    
  res.status(201).json({ success: true, message: "Article crée avec succéss" ,article});
} catch (error) {
  res.status(500).json({ success: false, message: "error lors de creation" });

}
};
//-------------------------------------------Mettre a jour un article-------------------------------------------------
exports.updateArticle = async (req, res) => {
  const id = req.params.id;


   // récupère l'ID de l'utilisateur depuis les paramètres de la requête
  const updateData = req.body; // récupère les données à mettre à jour depuis le corps de la requête
  try {
  
    const article = await Article.findByIdAndUpdate(id,req.body ,{ new: true });
if(!article) return  res.status(404).json({ message: "article non trouvé" });
    console.log({ article });
    return res.json({
      success: true,
      data: article,
      message: "Modifier avec succéss",
    });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de post" });
  }
};
//----------------------------------------charger photo de profile--------------------------------------------------------
exports.updateImagePost = async (req, res) => {
  const id = req.params.id;


  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile",
      public_id: `${id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    console.log(result);
    await Article.findByIdAndUpdate(
      id,
      { image: result.url },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Photo de profile a était modifié avec succées !",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error, try after some time" });
    console.log("Error while uploading profile image", error.message);
  }
};
//-----------------------------------------Recuperer tous les articles-----------------------------------------------------------
exports.listArticles = async (req, res) => {
  try {
    const allArtciles = await Article.find({});

    res.json({ status: "ok", data: allArtciles, success: true });
  } catch (error) {
    console.log(error);
  }
};

//--------------------------------------------Supprimer un article-----------------------------------------------
exports.supprimerArticle = async (req, res) => {
  const ArticleId = req.params.id;

  try {
    // Find the article by ID and delete it
    const deletedArticle = await Article.findByIdAndDelete(ArticleId);
    if (!deletedArticle) {
      return res
      .status(404)
        .json({ success: false, message: "Article not found" });
    }
    
    // Return a success message
    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//----------------------------recuperer les artciles d'un utilisateurs creer par lui-meme-----------------------------
exports.getArticleByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const articles = await Article.find({ createdBy: userId });
    res.status(200).json({ data:articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
//---------------------------------recuperer les infos d'un article------------------------------------------------------------ 
exports.getOneArticle = async (req, res) => {
  try {
     const userId = req.params.id;
    const article = await Article.findOne({  _id:userId });
    res.status(200).json({ data:article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
//-------------------------------recuperer les articles d'un utilisateurs adopter par lui-meme -----------------------------------
exports.getArticleByUserAdopted = async (req, res) => {
  try {
    const { userId } = req.params;

    const articles = await Article.find({ adoptedBy: userId });
    res.status(200).json({ data:articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};