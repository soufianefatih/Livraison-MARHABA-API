const Sequelize = require('sequelize')
const configdb = require('./config')['database']

module.exports = new Sequelize(
    configdb.database,
    configdb.username,
    configdb.password,
    configdb
)