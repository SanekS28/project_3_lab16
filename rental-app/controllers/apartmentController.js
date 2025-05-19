const service = require('../services/apartmentService');

async function showApartments(req, res) {
    const apartments = await service.getApartments();
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render('apartments', { apartments, message, error });
}

async function renderCreateForm(req, res) {
    res.render('createApartment');
}

async function createApartment(req, res) {
    await service.createApartment(req.body);
    res.redirect('/apartments');
}

async function renderEditForm(req, res) {
    const apartment = await service.getApartmentById(req.params.id);
    res.render('editApartment', { apartment });
}

async function updateApartment(req, res) {
    await service.updateApartment(req.params.id, req.body);
    res.redirect('/apartments');
}

async function deleteApartment(req, res) {
    await service.deleteApartment(req.params.id);
    res.redirect('/apartments');
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
