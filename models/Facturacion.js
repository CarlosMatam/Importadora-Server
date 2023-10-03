

import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ClienteSModel from "./Cliente.js";
import CompaniasSModel from "./Compania.js"; // Importa el modelo de Companias

import TipoFacturaSModel from "./Tipo_factura.js";


const FacturacionSModel = db.define('tab_facturas', {
    id_factura: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_compania: { type: DataTypes.INTEGER },
    id_tipo_factura: { type: DataTypes.INTEGER },
    id_cliente: { type: DataTypes.INTEGER },
    fecha: { type: DataTypes.DATE },
    vencimiento: { type: DataTypes.DATE },
    total: { type: DataTypes.DECIMAL },
});

const DetalleFacturaSModel = db.define('tab_detalle_facturas', {
    id_detalle_factura: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_factura: { type: DataTypes.INTEGER },
    id_producto: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    subtotal: { type: DataTypes.DECIMAL },
    descuento: { type: DataTypes.DECIMAL },
});

//CAMBIAR
FacturacionSModel.hasMany(DetalleFacturaSModel, { foreignKey: 'id_factura', onDelete: 'CASCADE', });
DetalleFacturaSModel.belongsTo(FacturacionSModel, { foreignKey: 'id_factura', onDelete: 'CASCADE', });

FacturacionSModel.belongsTo(ClienteSModel, { foreignKey: 'id_cliente' });

FacturacionSModel.belongsTo(CompaniasSModel, { foreignKey: 'id_compania' });
FacturacionSModel.belongsTo(TipoFacturaSModel, { foreignKey: 'id_tipo_factura' });

export { FacturacionSModel, DetalleFacturaSModel, ClienteSModel, CompaniasSModel, TipoFacturaSModel };