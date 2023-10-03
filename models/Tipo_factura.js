//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const TipoFacturaSModel = db.define('tab_tipos_facturas', {
    id_tipo_factura: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },


})

export default TipoFacturaSModel