import CompaniasSModel from './Compania.js';
import TipoFacturaSModel from './Tipo_factura.js';
import ClienteSModel from './Cliente.js';
import FacturacionSModel from './Facturacion.js' 
import DetalleFacturaSModel from './Detalle_factura.js'




FacturacionSModel.belongsTo(CompaniasSModel, { foreignKey: "id_compania"});
FacturacionSModel.belongsTo(TipoFacturaSModel, { foreignKey: "id_tipo_factura"});
FacturacionSModel.belongsTo(ClienteSModel, { foreignKey: "id_cliente" });
FacturacionSModel.hasMany(DetalleFacturaSModel, { foreignKey: 'id_factura' });


export { CompaniasSModel, TipoFacturaSModel, ClienteSModel, FacturacionSModel, DetalleFacturaSModel }

