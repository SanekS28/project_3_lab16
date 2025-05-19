const service = require('../services/apartmentService');

// Контролер — рівень представлення
async function showApartments(req, res) {
    try {
        const apartments = await service.getApartments(); 
        res.render('apartments', { apartments });         
    } catch (error) {
        res.status(500).send('Помилка сервера: ' + error.message);
    }
}

module.exports = { showApartments };
