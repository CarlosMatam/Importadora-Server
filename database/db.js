import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'b0ksmfcq5ngfygumb0tt-mysql.services.clever-cloud.com',

    dialect: 'mysql'

})

export default db