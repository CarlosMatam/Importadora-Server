import TipoCSModel from './Tipos_cedula.js';
import Telefono_proveedorSModel from './Telefono_proveedor.js';
import Direccion_proveedorSModel from './Direccion_proveedor.js';
import ProveedorSModel from './Proveedor.js'



ProveedorSModel.hasOne(Direccion_proveedorSModel, { foreignKey: "id_proveedor", onDelete: 'CASCADE' });
ProveedorSModel.hasOne(Telefono_proveedorSModel, { foreignKey: "id_proveedor", onDelete: 'CASCADE' });

ProveedorSModel.belongsTo(TipoCSModel, { foreignKey: "tipo_cedula" });





export { ProveedorSModel, Direccion_proveedorSModel, Telefono_proveedorSModel, TipoCSModel }