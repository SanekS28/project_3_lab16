const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rental_db', 'postgres', '5422', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Инициализируем модели
db.Apartment = require('./apartment')(sequelize);
db.Photo = require('./photo')(sequelize);

// Устанавливаем связи
db.Apartment.hasMany(db.Photo, { foreignKey: 'apartmentId', onDelete: 'CASCADE' });
db.Photo.belongsTo(db.Apartment, { foreignKey: 'apartmentId' });

module.exports = db;
