// Modelo para la tabla TAB_COMPRAS
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProveedorSModel from "./Proveedor.js";
import CompaniasSModel from "./Compania.js";
import BodegaSModel from './Bodega.js';
import ProductoSModel from './Producto.js';


const ComprasSModel = db.define('tab_compras', {
    num_documento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_compania: { type: DataTypes.INTEGER },
    id_bodega: { type: DataTypes.INTEGER },
    id_proveedor: { type: DataTypes.INTEGER },
    fecha: { type: DataTypes.DATE },
    total: { type: DataTypes.DECIMAL },
    descuento: { type: DataTypes.DECIMAL },
});

ComprasSModel.belongsTo(ProveedorSModel, { foreignKey: 'id_proveedor' });
ComprasSModel.belongsTo(CompaniasSModel, { foreignKey: 'id_compania' });
ComprasSModel.belongsTo(BodegaSModel, { foreignKey: 'id_bodega' });


// Modelo para la tabla DETALLE_COMPRAS
const DetalleComprasSModel = db.define('detalle_compras', {
    id_detalle: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    num_documento: { type: DataTypes.INTEGER },
    id_producto: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL },
    porc_descuento: { type: DataTypes.INTEGER },

    subtotal: { type: DataTypes.DECIMAL },
});

DetalleComprasSModel.belongsTo(ComprasSModel, { foreignKey: 'num_documento' });
DetalleComprasSModel.belongsTo(ProductoSModel, { foreignKey: 'id_producto' });
ComprasSModel.hasMany(DetalleComprasSModel, { foreignKey: 'num_documento' });

// Exportar los modelos
export { ComprasSModel, DetalleComprasSModel, CompaniasSModel, ProveedorSModel, BodegaSModel, ProductoSModel };