import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ClienteSModel = db.define('tab_clientes', {
    id_cliente: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    apellido_paterno: { type: DataTypes.STRING },
    apellido_materno: { type: DataTypes.STRING },
    id_tipo_cliente:{type: DataTypes.INTEGER},
    correo: { type: DataTypes.STRING },
    tipo_cedula: { type: DataTypes.INTEGER },
    cedula: { type: DataTypes.STRING },

})

export default ClienteSModel