
const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');
// var cors = require('cors'); 
// router.use(cors());
const authController = require('../controllers/scheduler');
const indexController = require('../index');
router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);



router.post('/login', authController.login);

router.post('/createRoom', authController.createRoom);

//router.post('/joinRoom', authController.joinRoom);

router.post('/joinRoom', authController.joinRoom);

// router.post('/addUsers', authController.addUsers);

router.post('/scheduler', authController.events);
router.get('/getEvents', authController.getEvents);
router.get('/getAllEvents', authController.getAllEvents);
router.post('/updateEvent', authController.updateEvent);
router.get('/getNoEvents', authController.noEvents);

router.delete('/deleteEvent', authController.deleteEvent);
router.delete('/deleteUser', authController.deleteUser);

router.get('/findRoom', authController.findRoom);
router.post('/saveAdmin', authController.saveAdmin);
router.post('/findRoomUser', authController.findRoomUser);
router.get('/findAdmin', authController.findAdmin);
router.get('/getUsers', authController.getUsers);
//router.get('/selectEvent', authController.selectEvent);
module.exports = router;


