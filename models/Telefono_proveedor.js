//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const Telefono_proveedorSModel = db.define('tab_telefonos_proveedores', {
    id_telefono: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    telefono_1: { type: DataTypes.INTEGER },
    telefono_2: { type: DataTypes.INTEGER },
    telefono_3: { type: DataTypes.INTEGER },
    id_proveedor: { type: DataTypes.INTEGER },
    

})

export default Telefono_proveedorSModel