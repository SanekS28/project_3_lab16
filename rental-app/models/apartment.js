const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Apartment', {
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rooms: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        location: DataTypes.STRING,
        size: DataTypes.INTEGER
    }, {
        timestamps: false
    });
};
