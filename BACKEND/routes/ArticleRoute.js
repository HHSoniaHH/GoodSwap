const express = require('express');
const { createArticle, listArticles, supprimerArticle, updateArticle, getArticleByUser, getOneArticle, updateImagePost, getArticleByUserAdopted } = require('../controllers/ArticleController');
const router = express.Router();
const { isAuth } = require('../middlewares/auth');
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

router.post('/createP' ,isAuth,uploads.single('article') , createArticle );
router.put('/article/:id', updateArticle);
router.put('/article/image/:id/',uploads.single('article'),updateImagePost);

router.get('/product/:id', isAuth,getOneArticle);

router.get('/:userId/articles',isAuth, getArticleByUser);
router.get('/:userId/articlesAdopter', getArticleByUserAdopted);

router.get('/getAllArticle',isAuth,listArticles);
router.delete('/deleteArticle/:id',isAuth,supprimerArticle);
module.exports = router;