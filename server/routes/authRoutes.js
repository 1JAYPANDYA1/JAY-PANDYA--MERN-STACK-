const express = require('express');
const { signupUser, loginUser,logOutUser,updateUser,getUser,hello } = require('../controllers/authController');
const verifyCookie = require('../middleware/verifyCookie'); 
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.post('/getUser',verifyCookie ,getUser);
router.post('/updateUser',verifyCookie ,updateUser);
router.post('/check',verifyCookie,hello);

module.exports = router;
