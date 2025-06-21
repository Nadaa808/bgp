const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { authenticateToken } = require('../middleware/auth');
const { validateSignUp, validateSignIn } = require('../middleware/validation');

// Public routes
router.post('/auth/signup', validateSignUp, apiController.signUp);
router.post('/auth/signin', validateSignIn, apiController.signIn);
router.get('/health', apiController.healthCheck);

// Protected routes
router.post('/auth/signout', authenticateToken, apiController.signOut);
router.post('/auth/signout-all', authenticateToken, apiController.signOutAll);
router.get('/profile', authenticateToken, apiController.getProfile);
router.put('/profile', authenticateToken, apiController.updateProfile);

module.exports = router;