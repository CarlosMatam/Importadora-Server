//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CobroSModel = db.define('tab_cobros', {
    id_cobro: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fecha_ingreso: { type: DataTypes.DATE},
    monto: { type: DataTypes.DECIMAL },
    estado: { type: DataTypes.TINYINT },
    id_cliente: { type: DataTypes.INTEGER },
})

export default CobroSModel