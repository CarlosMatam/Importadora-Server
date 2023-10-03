//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const Agente_ventaSModel = db.define('tab_agentes_ventas', {
    id_agente: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING},
    apellido_paterno: { type: DataTypes.STRING },
    apellido_materno: { type: DataTypes.STRING },
    comision_por_venta: { type: DataTypes.STRING },
    id_zona: { type: DataTypes.INTEGER },
    identificacion: { type: DataTypes.STRING },
    
    
    
})

export default Agente_ventaSModel