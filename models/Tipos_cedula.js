//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const TipoCSModel = db.define('tab_tipos_cedulas', {
    id_tipo_cedula: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descripcion: { type: DataTypes.STRING },


})

export default TipoCSModel