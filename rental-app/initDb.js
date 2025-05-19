const sequelize = require('./models');
const Apartment = require('./models/apartment');
const Photo = require('./models/photo');

// Настройка связи один-ко-многим: одна квартира → много фото
Apartment.hasMany(Photo, { foreignKey: 'apartmentId', onDelete: 'CASCADE' });
Photo.belongsTo(Apartment, { foreignKey: 'apartmentId' });

async function init() {
    try {
        await sequelize.sync({ force: true }); // пересоздание таблиц
        console.log('Database synced successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error syncing database:', err);
        process.exit(1);
    }
}

init();
