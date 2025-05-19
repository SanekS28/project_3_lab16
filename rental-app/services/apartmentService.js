const repo = require('../repositories/apartmentRepository');

async function getApartments() {
    return await repo.getAllApartments();
}

async function createApartment(data) {
    return await repo.insertApartment(data);
}

async function getApartmentById(id) {
    return await repo.getApartmentById(id);
}

async function updateApartment(id, data) {
    return await repo.updateApartment(id, data);
}

async function deleteApartment(id) {
    return await repo.deleteApartment(id);
}

async function duplicateApartment(id) {
    return await repo.duplicateApartment(id);
}

module.exports = {
    getApartments,
    createApartment,
    getApartmentById,
    updateApartment,
    deleteApartment,
    duplicateApartment
};
