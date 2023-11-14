const express = require('express');

const router = express.Router();
const { isAuth } = require('../middlewares/auth');
const { createEvent, addParticipant, createTicket, reserverUnticket, AnnulerReserverUnticket, getAllEventByOrgan, getAllTicketByEvent, getAllEvent, ImprimerTicket } = require('../controllers/EventController');

router.post('/createEvent/:id',createEvent)
router.post('/addParticipent/:id',addParticipant)
router.get('/getAllEvent',getAllEvent)
router.get('/getAllEventByOrgan/:id',getAllEventByOrgan)



router.post('/addTicket/:id',createTicket)
router.get('/getAllTicketByEvent/:id',getAllTicketByEvent)

router.post('/reseverUnTicket/:idUser/:idTiket',reserverUnticket)
router.post('/imprimerTicket/:id/:idTicket',ImprimerTicket)
// router.post('/print',ImprimerTicket)

router.post('/AnnulerReseverUnTicket/:idUser/:idTiket',AnnulerReserverUnticket)


module.exports = router;