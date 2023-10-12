//importamos el Modelo
import { PagoSModel, ProveedorSModel } from '../models/Relaciones_pago.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllPago = async (req, res) => {
    try {
        const pago = await PagoSModel.findAll({
            include:
                [ProveedorSModel]
        })
        res.json(pago)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getPago = async (req, res) => {
    try {
        const pago = await PagoSModel.findAll({
            where: { id_pago: req.params.id_pago }
        })
        res.json(pago[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createPago = async (req, res) => {

    try {
        const { id_proveedor, fecha_ingreso, monto, estado } = req.body;
        console.log(req.body);
        const proveedor = await ProveedorSModel.findOne({
            where: { id_proveedor }
        });
        if (!proveedor) {
            return res.json({ message: 'No se encontró un proveedor con el ID proporcionado' });
        }
        await PagoSModel.create(req.body)
        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Actualizar un registro
export const updatePago = async (req, res) => {
    try {
        await PagoSModel.update(req.body, {
            where: { id_pago: req.params.id_pago }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Eliminar un registro
export const deletePago = async (req, res) => {
    try {
        await PagoSModel.destroy({
            where: { id_pago: req.params.id_pago }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}