//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const Direccion_agenteSModel = db.define('tab_direcciones_agentes_ventas', {
    id_direccion: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    provincia: { type: DataTypes.STRING },
    canton: { type: DataTypes.STRING },
    distrito: { type: DataTypes.STRING },
    barrio: { type: DataTypes.STRING },
    otras_sennas: { type: DataTypes.STRING },
    id_agente: { type: DataTypes.INTEGER },


})

export default Direccion_agenteSModel