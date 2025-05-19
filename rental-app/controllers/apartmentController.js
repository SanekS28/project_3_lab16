const service = require('../services/apartmentService');

async function showApartments(req, res) {
    try {
        const apartments = await service.getApartments();
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('apartments', { apartments, message, error });
    } catch (err) {
        res.status(500).send('Помилка при завантаженні списку: ' + err.message);
    }
}

async function renderCreateForm(req, res) {
    res.render('createApartment');
}

async function createApartment(req, res) {
    try {
        await service.createApartment(req.body);
        res.redirect('/apartments');
    } catch (err) {
        res.status(500).send('Помилка при створенні: ' + err.message);
    }
}

async function renderEditForm(req, res) {
    try {
        const apartment = await service.getApartmentById(req.params.id);
        res.render('editApartment', { apartment });
    } catch (err) {
        res.status(500).send('Помилка при відкритті форми: ' + err.message);
    }
}

async function updateApartment(req, res) {
    try {
        await service.updateApartment(req.params.id, req.body);
        res.redirect('/apartments');
    } catch (err) {
        res.status(500).send('Помилка при оновленні: ' + err.message);
    }
}

async function deleteApartment(req, res) {
    try {
        await service.deleteApartment(req.params.id);
        res.redirect('/apartments');
    } catch (err) {
        res.status(500).send('Помилка при видаленні: ' + err.message);
    }
}

async function duplicateApartment(req, res) {
    try {
        await service.duplicateApartment(req.params.id);
        res.redirect('/apartments?message=Копіювання успішне');
    } catch (err) {
        res.redirect('/apartments?error=Помилка при копіюванні');
    }
}

module.exports = {
    showApartments,
    renderCreateForm,
    createApartment,
    renderEditForm,
    updateApartment,
    deleteApartment,
    duplicateApartment
};
