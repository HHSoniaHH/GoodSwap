const express = require('express');

const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const { createCagnotte, FaireUnDon, getAllCagnotte, getAllCagnotteByuser } = require('../controllers/CagnotteController');
const multer = require('multer');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/createCagnotte/:id',uploads.single('cagnotte'),createCagnotte)
router.post('/addMontant/:id',FaireUnDon)
router.get('/getAllCagnotte',getAllCagnotte)
router.get('/getAllCagnotteByUser/:id',getAllCagnotteByuser)
// router.get('/getAllcat',getAllcat)



module.exports = router;