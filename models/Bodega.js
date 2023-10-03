import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const BodegaSModel = db.define('tab_bodegas', {
    id_bodega: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING }

})

export default BodegaSModel