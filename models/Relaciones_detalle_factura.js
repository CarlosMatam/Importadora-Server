import FacturacionSModel from './Facturacion.js';
import ProductoSModel from './Producto.js'
import DetalleFacturaSModel from './Detalle_factura.js'



DetalleFacturaSModel.belongsTo(FacturacionSModel, { foreignKey: "id_factura", onDelete: 'CASCADE' });
DetalleFacturaSModel.hasMany(ProductoSModel, { foreignKey: 'id_producto' });
ProductoSModel.belongsTo(DetalleFacturaSModel, { foreignKey: 'id_producto' });







export { FacturacionSModel, ProductoSModel, DetalleFacturaSModel}



