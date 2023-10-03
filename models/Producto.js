
//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ProductoSModel = db.define('tab_productos', {
    id_producto: { type: DataTypes.STRING, autoIncrement: false, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    proveedor: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.NUMBER },
    descuento: { type: DataTypes.NUMBER },
    porcentaje_ganancia_1: { type: DataTypes.NUMBER },
    porcentaje_ganancia_2: { type: DataTypes.NUMBER },
    porcentaje_ganancia_3: { type: DataTypes.NUMBER },
    existencia_actual: { type: DataTypes.INTEGER },
    cabys: { type: DataTypes.STRING },
    compania: { type: DataTypes.INTEGER },
    fecha_ingreso: { type: DataTypes.DATE },
})

export default ProductoSModel