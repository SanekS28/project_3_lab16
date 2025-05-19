const express = require('express');
const router = express.Router();
const controller = require('../controllers/apartmentController');

router.get('/', controller.showApartments);

module.exports = router;
