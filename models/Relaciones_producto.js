
import ProductoSModel from './Producto.js';
import ProveedorSModel from './Proveedor.js';
import CompaniaSModel from './Compania.js';
import CabysSModel from './Cabys.js';

ProveedorSModel.hasMany(ProductoSModel, { foreignKey: "proveedor" })
CompaniaSModel.hasMany(ProductoSModel, { foreignKey: "compania" })
ProductoSModel.belongsTo(CabysSModel,{foreignKey: "cabys"})

export { ProveedorSModel, ProductoSModel, CompaniaSModel, CabysSModel }