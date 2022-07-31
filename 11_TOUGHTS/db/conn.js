const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('tought', 'root', 'wesley08', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com Sucesso !')
} catch(err) {
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize