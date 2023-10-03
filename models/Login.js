//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const LogeoSModel = db.define('tab_usuarios', {
    id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    login_user: { type: DataTypes.STRING },
    contrasenna: { type: DataTypes.STRING },
    id_rol: { type: DataTypes.INTEGER },
    
})

export default LogeoSModel