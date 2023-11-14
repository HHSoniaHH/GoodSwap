const express = require('express');

const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const { createDemande, AccepteDemande, RefuseDemande, FinaleserDemande, getAlldemande, getAlldemandeByAdopteur, getAlldemandeByDonnateur, AnnulerMaDemande } = require('../controllers/DemandeController');

router.post('/createDemandeArticle',createDemande)
router.get('/getAlldemande',getAlldemande)
router.get('/getAlldemandeByadopteur/:id',getAlldemandeByAdopteur)
router.get('/getAlldemandeByDonnateur/:id',getAlldemandeByDonnateur)


router.put('/accepterDemandeArticle/:id',AccepteDemande)
router.delete('/finaliserDemandeArticle/:id',FinaleserDemande)
router.delete('/refuserDemandeArticle/:id',RefuseDemande)
router.delete('/annulerDemandeArticle/:id',AnnulerMaDemande)


module.exports = router;