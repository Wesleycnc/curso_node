const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'wesley08', {
    host:'localhost', 
    dialect: 'mysql'
})
/* 
try  {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o Sequelize!')

} catch(err) {
    console.log('Não foi possivel conectar: ', error)
}
 */
module.exports = sequelize