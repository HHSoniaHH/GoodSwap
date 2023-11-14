const express = require('express');

const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const { createOrgan, getAllOrgan, getAllOrganByuser } = require('../controllers/OrganisationConroller');
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

router.post('/createOrgan/:id',uploads.single('organisation'),createOrgan)

router.get('/getAllOrganisation',getAllOrgan)
router.get('/getAllOrganisationByUser/:id',getAllOrganByuser)



module.exports = router;