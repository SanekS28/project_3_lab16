const { Apartment, Photo, sequelize } = require('../models');

// Получить все квартиры с фото
async function getAllApartments() {
    return await Apartment.findAll({ include: Photo });
}

// Создать квартиру (транзакционно)
async function insertApartment(data) {
    const transaction = await sequelize.transaction();
    try {
        await Apartment.create(data, { transaction });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

// Получить квартиру по ID с фото
async function getApartmentById(id) {
    return await Apartment.findByPk(id, { include: Photo });
}

// Обновить квартиру (транзакционно)
async function updateApartment(id, data) {
    const transaction = await sequelize.transaction();
    try {
        await Apartment.update(data, { where: { id }, transaction });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

// Удалить квартиру (транзакционно)
async function deleteApartment(id) {
    const transaction = await sequelize.transaction();
    try {
        await Apartment.destroy({ where: { id }, transaction });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

// Клонировать квартиру и её фото (транзакционно)
async function duplicateApartment(id) {
    const transaction = await sequelize.transaction();
    try {
        const original = await Apartment.findByPk(id, { include: Photo });

        if (!original) throw new Error('Original apartment not found');

        const clone = await Apartment.create({
            owner: original.owner,
            description: original.description + ' (копія)',
            rooms: original.rooms,
            price: original.price,
            location: original.location,
            size: original.size
        }, { transaction });

        for (const photo of original.Photos) {
            await Photo.create({
                apartmentId: clone.id,
                url: photo.url
            }, { transaction });
        }

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

module.exports = {
    getAllApartments,
    insertApartment,
    getApartmentById,
    updateApartment,
    deleteApartment,
    duplicateApartment
};
