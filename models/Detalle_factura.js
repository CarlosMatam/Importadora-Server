//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const DetalleFacturaSModel = db.define('tab_detalle_facturas', {
    id_detalle_factura: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_factura: { type: DataTypes.INTEGER },
    id_producto: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.INTEGER },
    subtotal: { type: DataTypes.DECIMAL },
    descuento: { type: DataTypes.NUMBER },



})

export default DetalleFacturaSModel