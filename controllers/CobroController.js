//importamos el Modelo
import { ClienteSModel, CobroSModel } from '../models/Relaciones_cobro.js';


//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllCobro = async (req, res) => {
    try {
        const cobro = await CobroSModel.findAll({
            include:
                [ClienteSModel]

        })
        res.json(cobro)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getCobro = async (req, res) => {
    try {
        const cobro = await CobroSModel.findAll({
            where: { id_cobro: req.params.id_cobro }
        })
        res.json(cobro[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createCobro = async (req, res) => {
    try {
        const { id_cliente, fecha_ingreso, monto, estado } = req.body;
        const cliente = await ClienteSModel.findOne({
            where: { id_cliente }
        });
        if (!cliente) {
            return res.json({ message: 'No se encontró un cliente con el ID proporcionado' });
        }
        await CobroSModel.create(req.body)
        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Actualizar un registro
export const updateCobro = async (req, res) => {
    try {
        await CobroSModel.update(req.body, {
            where: { id_cobro: req.params.id_cobro }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Eliminar un registro
export const deleteCobro = async (req, res) => {
    try {
        await CobroSModel.destroy({
            where: { id_cobro: req.params.id_cobro }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}