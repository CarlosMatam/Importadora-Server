//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const Tipo_clienteSModel = db.define('tab_tipos_clientes', {
    id_tipo_cliente: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre:{type:DataTypes.STRING},
    descripcion: { type: DataTypes.STRING },

})

export default Tipo_clienteSModel