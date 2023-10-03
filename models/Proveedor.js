//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ProveedorSModel = db.define('tab_proveedores', {
    id_proveedor: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    correo: {type: DataTypes.STRING},
    tipo_cedula: {type:DataTypes.INTEGER},
    cedula: {type:DataTypes.STRING},
})

export default ProveedorSModel