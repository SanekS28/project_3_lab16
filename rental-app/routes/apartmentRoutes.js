const express = require('express');
const router = express.Router();
const controller = require('../controllers/apartmentController');

router.get('/', controller.showApartments);
router.get('/create', controller.renderCreateForm);
router.post('/create', controller.createApartment);

router.get('/edit/:id', controller.renderEditForm);
router.post('/edit/:id', controller.updateApartment);

router.post('/delete/:id', controller.deleteApartment);
router.post('/duplicate/:id', controller.duplicateApartment);

module.exports = router;
