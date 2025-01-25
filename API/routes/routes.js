const express = require('express');
const userController = require('../controller/controller');
const cardController = require('../controller/controllerCard');
const UserCardController = require('../controller/ControllerUserCard');

const router = express.Router();

router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUserById)
router.post('/registerUser', userController.createUser)
router.post('/userLogin', userController.userLogin)

router.get('/getUserCard/:id', cardController.getUserCard)
router.post('/createCards', cardController.createCard)
router.delete('/deleteCarts/:cardId', cardController.deleteCard)
router.put('/updateCardStatus/:cardId', cardController.updateCardStatus)
router.put('/updateCard/:cardId', cardController.updateCard)

router.get('/comment/:cardId', cardController.getCommentsByCard)
router.post('/sendComment/:cardId', cardController.postCommentsByCard)
router.put('/updateComment/:commentId', cardController.updateComment)

router.get('/sharedUsers/:cardId', UserCardController.getShareUserCard)
router.get('/sharedCards/:userId', UserCardController.getSharedCardsForUser)
router.post('/share', UserCardController.createShareCardStatus)

module.exports = router;
