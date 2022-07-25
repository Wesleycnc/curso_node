const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Criação da tabela em models (Criar tabelas em códigos)
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = User