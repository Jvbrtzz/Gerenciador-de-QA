const express = require('express');
const UserController = require('../controller/controller');
const cardController = require('../controller/controllerCard');
const UserCardController = require('../controller/ControllerUserCard');

const router = express.Router();

router.get('/users', UserController.getUsers)
router.get('/user/:id', UserController.getUserById)
router.post('/registerUser', UserController.createUser)
router.post('/userLogin', UserController.userLogin)

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
router.delete('/deleteShare/:userId/:cardId', UserCardController.deleteShareUser)


module.exports = router;
