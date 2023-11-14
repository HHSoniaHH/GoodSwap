const express = require('express');
const router = express.Router();
const {
  createUser
  ,userSignIn,
  listUsers,
  uploadProfile,
  signOut,
  IsProfile,
  FindUser,
  updateProfile,
  supprimerUser,
  verifyEmail,
  ForgotPassword,
  ResetPass,
  resetOTP,
  verifyPasswordOtp,
  resetOTPPasswordReset,
  getUser,
  AjouterAvis,
  supprimerAvis,
  AjouterDemandeUpgrade,
  AccepteDemandeUpgrade,
  RefuserDemandeUpgrade,
  getAlldemandesUpgrade,
  // uploadProfile
} = require('../controllers/UserController');
const{
    userVlidation,
    validateUserSignUp
    ,validateUserSignIn
}=require('../middlewares/validation/user')
const { isAuth } = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');
const { IsResetTokenValid } = require('../middlewares/resetPassword');


const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/cree',validateUserSignUp,userVlidation ,  createUser );
router.post('/verifier',verifyEmail)
router.post('/resetOtp',resetOTP)
router.post('/resetOTPPasswordReset',resetOTPPasswordReset)

router.post('/forgot',ForgotPassword)

router.post('/reset',ResetPass)
router.post('/login', validateUserSignIn, userVlidation, userSignIn);
router.get('/get',listUsers);
router.get('/user/:id', getUser);


router.post('/verifyResetPasswordOtp',IsResetTokenValid,(req,res)=>{
  res.json({success:true,message:'is valide token'})
});




router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
);
// router.post('/post',isAuth ,async (req,res)=>{
//   res.send("good");
// } );
router.get('/logout', isAuth, signOut);
router.get('/profile', isAuth, IsProfile);

router.get('/getAllUser',isAuth,listUsers);
router.delete('/deleteUser/:id',isAuth,supprimerUser);

router.put('/user/:id', isAuth, updateProfile);


//avis 


router.post('/ajouterAvis/:id',AjouterAvis)
router.delete('/supprimerAvis/:id/:avisId',supprimerAvis)


//Demande de upgrade
router.post('/user/createDemandeUpgrade/:id',AjouterDemandeUpgrade)
router.post('/user/AccepterDemandeUpgrade/:id',AccepteDemandeUpgrade)
router.put('/user/RefuserDemandeUpgrade/:id',RefuserDemandeUpgrade)
router.get('/getDemandeUpgrade',getAlldemandesUpgrade);



module.exports = router;