const  express =require ("express");
const { createChat, findChat, userChats }= require('../controllers/chat/ChatController.js');
const router = express.Router()

router.post('/chat', createChat);
router.get('/chat/:userId', userChats);
router.get('/chat/ind/:firstId/:secondId', findChat);

module.exports = router;