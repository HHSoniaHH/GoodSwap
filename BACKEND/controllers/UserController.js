//---------declarations et importations de bibliotheques et de fonctions ----------------------------
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("../helper/imageUpload");

const path = require("path");
const {
  generateOTP,
  mailTransport,
  GenerateEmailTemplate,
  GenerateEmailTemplateSuccess,
  GenerateEmailTemplateReinitialiserMdp,
  GenerateEmailTemplateReinitialiserMdpSucces,
} = require("../utils/mail");
const Verification = require("../models/VerificationModel");
const { isValidObjectId } = require("mongoose");
const Article = require("../models/ArticleModel");

//------------------------------------------Creer un nouveau utilisateur--------------------------------------------------------------
exports.createUser = async (req, res) => {
  const { fname, lname, email, password, UserType } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "Un utilisateur a déjà un compte avec cette adresse email",
    });
  const user = await User({
    fname,
    lname,
    email,
    password,
    UserType,
  });

  const OTP = generateOTP();
  const verification = new Verification({
    owner: user._id,
    token: OTP,
  });
  
  await verification.save();
  
  await user.save();
  mailTransport().sendMail({
    from: "otto.coding.dz@gmail.com",
    to: user.email,
    subject: "Verifie votre compte",
    html: GenerateEmailTemplate(OTP, user.fname, user.lname),
  });
  
  res.json({ success: true, data: user });
};
//-------------------------------------------Charger photo de profile------------------------------------------------
exports.uploadProfile = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile",
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    console.log(result);
    await User.findByIdAndUpdate(
      user._id,
      { avatar: result.url },
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
//-----------------------------------------Connceter a votre compte utilisateur-----------------------------------------
exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.json({
      success: false,
      message: "Utilisateur non trouvé avec cette adresse email!",
    });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.json({
      success: false,
      message: "Le mot de passe est incorrect",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });
  // const userInfo = {
  //   id: user.id,
  //   fname: user.fname,
  //   lname: user.lname,
  //   email: user.email,
  //   avatar: user.avatar ? user.avatar : "",
  //   UserType: user.UserType,
  //   status: user.status,
  // };
  res.json({ success: true, user: user, token });
};

//-------------------------------------------Déconnecter de votre compte------------------------------------------------------------------
exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Autorisation échoué!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Deconnecter avec succes!" });
  }
};
//-------------------------------------Recuperer les infos d'un user connceter-------------------------------------------------------------------
exports.IsProfile = async (req, res) => {
  if (!req.user) return res.json({ success: false, message: "echec" });

  res.json({
    success: true,
    profile: {
      id: req.user.id,
      status: req.user.status,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
      avatar: req.user.avatar ? req.user.avatar : "",
      UserType: req.user.UserType,
      smiles: req.user.smiles,
      Avis: req.user.Avis,
    },
  });
};
//-----------------------------------------Recuperer les utilisateurs--------------------------------------------------------
exports.listUsers = async (req, res) => {
  try {
    const allUser = await User.find({});

    res.json({ message: "get all users", data: allUser, success: true });
  } catch (error) {
    console.log(error);
  }
};
//-------------------------------------Recuperer les infos d'un user non connecter-------------------------------------------------------------------
exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//--------------------------------------Mettre a jour les infos user----------------------------------------------------------------------
exports.updateProfile = async (req, res) => {
  const id = req.params.id; // récupère l'ID de l'utilisateur depuis les paramètres de la requête
  const updateData = req.body; // récupère les données à mettre à jour depuis le corps de la requête

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user)
      return res.status(404).json({ message: "utilisateur non trouvé" });
    console.log({ user });
    return res.json({
      success: true,
      data: user,
      message: "Modifier avec succéss",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de utilisateur" });
  }
};
//---------------------------------------Supprimer un user par l'admin--------------------------------------------------
exports.supprimerUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID and delete it
    const createdBy = await Article.find({ createdBy: userId });
    if (createdBy) {
      await Article.deleteMany({ createdBy: userId });
    }
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return a success message
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//------------------------------Verification email avec le code otp lors de la creation de compte----------------------------------
exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    if (!userId || !otp.trim())
      return res
        .status(500)
        .json({ success: false, message: "missing parametres" });

    if (!isValidObjectId(userId))
      return res
        .status(404)
        .json({ success: false, message: "invalid user id " });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    if (user.status === "Active")
      return res
        .status(400)
        .json({ success: false, message: "user est deja active" });

    const token = await Verification.findOne({ owner: user._id });
    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "user est deja token" });

    const isMatched = await token.compareToken(otp);

    if (!isMatched)
      return res
        .status(403)
        .json({ success: false, message: "error valide token " });

    user.status = "Active";
    await Verification.findByIdAndDelete(token._id);

    await User.updateOne({ _id: user._id }, { status: user.status });
    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: user.email,
      subject: "Validation de compte",
      html: GenerateEmailTemplateSuccess(user.fname, user.lname),
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Compte activé avec succées",
        user: {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          password: user.password,
          id: user._id,
        },
      });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
//reinitaliser le mot de passe
//------------------------------Demande de reinitialiser le mdp Si 1e mot de passe est oublié ------------------------------------------------------------------  
exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(500).json({ success: false, message: "invalide mail" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({
          success: false,
          message: "utilisateur non trouvé avec ce mail",
        });

    const token = await Verification.findOne({ owner: user._id });
    if (token)
      return res
        .status(404)
        .json({
          success: false,
          message: "raju wahed n sa3a aken att sa9ssidh",
        });

    // const tok = await cryptoRandomBytes();
    // const resetToken=new ResetToken({owner:user._id,token:tok})
    // await resetToken.save()
    // mailTransport().sendMail({
    //   from: "otto.coding.dz@gmail.com",
    //   to: user.email,
    //   subject: "Renitialiser le mot de passe",
    //   html: GenerateEmailTemplateReinitialiserMdp(`http://localhost:3000/reset-password?token=${tok}&id=${user._id}`,user.fname,user.lname),
    // });
    const OTP = generateOTP();
    const resetToken = new Verification({
      owner: user._id,
      token: OTP,
    });

    await resetToken.save();

    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: user.email,
      subject: "Renitialiser le mot de passe",
      html: GenerateEmailTemplateReinitialiserMdp(OTP, user.fname, user.lname),
    });
    res
      .status(200)
      .json({
        success: true,
        message: "lien envoyé avec success",
        id: user._id,
      });
  } catch (error) {
    console.log(error);
  }
};
//---------------------------------- reinitialiser 1e mot de passe aprés la vérification ------------------------------------------------------------------  
exports.ResetPass = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "utilisateur non trouvé " });

    const isPass = await user.comparePassword(password);

    if (isPass)
      return res
        .status(404)
        .json({
          success: false,
          message: "Entrer un mot de passe différent du l'ancien ",
        });

    if (password.trim().length < 8 || password.trim().length > 20)
      return res
        .status(404)
        .json({
          success: false,
          message: "Entrer un mot de passe entre 8 et 20 ",
        });

    user.password = password.trim();

    await user.save();
    await Verification.findOneAndDelete({ owner: user._id });

    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: user.email,
      subject: "Renitialiser le mot de passe",
      html: GenerateEmailTemplateReinitialiserMdpSucces(user.fname, user.lname),
    });
    res
      .status(200)
      .json({
        success: true,
        message: "mot de passe reinitialiser avec success",
      });
  } catch (error) {
    console.log(error);
  }
};
//----------------------- renvoyer 1e code otp de la creation de compte si on l'a pas recue dans la boite mail  ------------------------------------------------------------------  
exports.resetOTP = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "utilisateur non trouvé " });
    const OTP = generateOTP();
    const oldotp = await Verification.findOne({ owner: user._id });
    if (oldotp)
      return res
        .status(404)
        .json({ success: false, message: "old otp is accessible" });

    const verification = new Verification({
      owner: user._id,
      token: OTP,
    });

    await verification.save();

    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: user.email,
      subject: "Verifie votre compte",
      html: GenerateEmailTemplate(OTP, user.fname, user.lname),
    });

    res.json({
      success: true,
      data: user,
      message: "Verifier votre boite email",
    });
  } catch (error) {}
};
//----------------------- renvoyer 1e code otp de la reinitialisation du mdp si on l'a pas recue dans la boite mail  ------------------------------------------------------------------  
exports.resetOTPPasswordReset = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "utilisateur non trouvé " });
    const OTP = generateOTP();
    const oldotp = await Verification.findOne({ owner: user._id });
    if (oldotp)
      return res
        .status(404)
        .json({ success: false, message: "old otp is accessible" });

    const verification = new Verification({
      owner: user._id,
      token: OTP,
    });

    await verification.save();

    mailTransport().sendMail({
      from: "otto.coding.dz@gmail.com",
      to: user.email,
      subject: "Renitialiser le mot de passe",
      html: GenerateEmailTemplateReinitialiserMdp(OTP, user.fname, user.lname),
    });

    res.json({
      success: true,
      data: user,
      message: "Verifier votre boite email",
    });
  } catch (error) {}
};
//----------------------------------------Ajouter un avis sur un utilisateur---------------------------------------------------------------------------------
exports.AjouterAvis = async (req, res) => {
  const id = req.params.id;
  const { text, rating, createdBy } = req.body;

  const user = await User.findById(createdBy);
  const Avis = {
  
    text,
    rating,
    createdBy,
    auteur: user.fname + " " + user.lname,
    avatar:user.avatar
  };

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { Avis: Avis } },
    { new: true }
  );

  res.json({ success: true, message:'Votre avis à été créé', data: updatedUser });
};
//-----------------------------------------Supprimer  un avis sur un utilisateur-------------------------------------------------------------------------------
exports.supprimerAvis = async (req, res) => {
  const id = req.params.id;
  const avisId = req.params.avisId;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { Avis: { _id: avisId } } },
    { new: true }
  );


  res.json({ success: true, message:'Votre avis à été suppreimer', data: updatedUser });
};
//------------------------------Creer une demande d'abonnement upgdrade type user to a user pro-----------------------------
exports.AjouterDemandeUpgrade = async (req, res) => {
  const id = req.params.id;
  const { NomOrganisation, EmailOrganisation, TelOrgansiation } = req.body;

  const user = await User.findById(id);
  const Olddemande = user.demandes.find(p => p.UserDemandeId.toString() === id);

  if (Olddemande) {
    return res.json({
      success: false,
      message: "Vous avez déjà demandé un Upgrade",
    });
  }
  const DemandeUpgrade = {
    UserDemandeId: id,
    UserDemandeName: user.fname + " " + user.lname,
    NomOrganisation,
    EmailOrganisation,
    TelOrgansiation,
  };

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { demandes: DemandeUpgrade } },
    { new: true }
  );

  res.json({ success: true, message:'Votre demande a été créée', data: updatedUser });
};
//---------------------------------------------------ACCEPTER La demande par l'admin------------------------------------------
exports.AccepteDemandeUpgrade = async (req, res) => {
  const id = req.params.id;
  const { UserDemandeId } = req.body;

  try {
    const user = await User.findById(UserDemandeId);
    const demande =  user.demandes.find(p => p._id.toString() === id);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!user)
      return res.json({ success: false, message: "user non trouve" });

    user.demandes = [];
    user.UserType = "Organisateur";

    await User.updateOne({ _id: UserDemandeId }, { UserType: user.UserType,demandes:user.demandes });

    res.json({
      success: true,
      message: "Compte mise au niveau Organisateur avec succéss",
     user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error de mise en niveau" });
  }
};//---------------------------------------------------Refuser La demande par l'admin------------------------------------------

exports.RefuserDemandeUpgrade = async (req, res) => {
  const id = req.params.id;
  const { UserDemandeId } = req.body;

  try {
    const user = await User.findById(UserDemandeId);
    const demande =  user.demandes.find(p => p._id.toString() === id);

    if (!demande)
      return res.json({ success: false, message: "demande non trouve" });
    if (!user)
      return res.json({ success: false, message: "user non trouve" });

    user.demandes = [];
    await User.updateOne({ _id: UserDemandeId }, {demandes:user.demandes });


    res.json({
      success: true,
      message: "Demande de mise au niveau Organisateur réfusé ",
     user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};//---------------------------------------------------Recuperer les demandes de tous les utilisateurs par l'admin------------------------------------------
exports.getAlldemandesUpgrade=async(req,res)=>{

  const users = await User.find(); // retrieve all users
  const demandesArray = [];
  
  // loop through each user document
  users.forEach(user => {
    // loop through each demandes object in the user document
    user.demandes.forEach(demande => {
      demandesArray.push(demande); // push the demandes object into an array
    });
  });
  res.json({ data:demandesArray, success: true });



}