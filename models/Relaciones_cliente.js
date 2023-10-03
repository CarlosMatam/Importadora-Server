import ClienteSModel from './Cliente.js';
import Direccion_clienteSModel from './Direccion_cliente.js';
import Telefono_clienteSModel from './Telefono_cliente.js';
import Tipo_clienteSModel from './Tipos_cliente.js';
import TipoCSModel from './Tipos_cedula.js';

ClienteSModel.hasOne(Direccion_clienteSModel, { foreignKey: "id_cliente", onDelete: 'CASCADE' });
ClienteSModel.hasOne(Telefono_clienteSModel, { foreignKey: "id_cliente", onDelete: 'CASCADE' });
ClienteSModel.belongsTo(Tipo_clienteSModel, { foreignKey: "id_tipo_cliente" });
ClienteSModel.belongsTo(TipoCSModel,{foreignKey:"tipo_cedula"})


export { ClienteSModel, Direccion_clienteSModel, Telefono_clienteSModel, Tipo_clienteSModel, TipoCSModel }
