//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const PagoSModel = db.define('tab_pagos', {
    id_pago: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fecha_ingreso: { type: DataTypes.DATE},
    monto: { type: DataTypes.NUMBER },
    estado: { type: DataTypes.TINYINT },
    id_proveedor: { type: DataTypes.INTEGER },
})

export default PagoSModel