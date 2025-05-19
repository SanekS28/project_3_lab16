const repo = require('../repositories/apartmentRepository');

// Сервіс — рівень бізнес-логіки
async function getApartments() {
   
    return await repo.getApartmentsAsync(); 
}

module.exports = { getApartments };
