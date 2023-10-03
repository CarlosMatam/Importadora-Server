import ClienteSModel from '../models/Cliente.js';
import CobroSModel from '../models/Cobro.js';

ClienteSModel.hasMany(CobroSModel, { foreignKey: "id_cliente" })
CobroSModel.belongsTo(ClienteSModel, { foreignKey: "id_cliente" }); //Se puede quitar este, hay que ver si corre primero con las dos

export { ClienteSModel, CobroSModel}