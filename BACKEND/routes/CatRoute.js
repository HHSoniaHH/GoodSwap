const express = require('express');

const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const { createCat, getAllcat } = require('../controllers/CatigorieController');

router.post('/createCat',createCat)

router.get('/getAllcat',getAllcat)



module.exports = router;