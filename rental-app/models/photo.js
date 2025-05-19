const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Photo', {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apartmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
