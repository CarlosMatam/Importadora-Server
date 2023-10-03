//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CabysSModel = db.define('tab_cabys', {
    categoria_1: { type: DataTypes.STRING },
    descripcion_categoria_1: { type: DataTypes.STRING },
    categoria_2: { type: DataTypes.STRING },
    descripcion_categoria_2: { type: DataTypes.STRING },
    categoria_3: { type: DataTypes.STRING },
    descripcion_categoria_3: { type: DataTypes.STRING },
    categoria_4: { type: DataTypes.STRING },
    descripcion_categoria_4: { type: DataTypes.STRING },
    categoria_5: { type: DataTypes.STRING },
    descripcion_categoria_5: { type: DataTypes.STRING },
    categoria_6: { type: DataTypes.STRING },
    descripcion_categoria_6: { type: DataTypes.STRING },
    categoria_7: { type: DataTypes.STRING },
    descripcion_categoria_7: { type: DataTypes.STRING },
    categoria_8: { type: DataTypes.STRING },
    descripcion_categoria_8: { type: DataTypes.STRING },
    codigo_bien_servicio: {type: DataTypes.STRING},
    descripcion_bien_servicio: {type: DataTypes.STRING},
    impuesto: {type: DataTypes.STRING},
    id_cabys_mym:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
})

export default CabysSModel