// Importa el modelo del agente de ventas
import { ClienteSModel, Direccion_clienteSModel } from '../models/Relaciones_cliente.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllDireccion = async (req, res) => {
    try {
        const direccion = await Direccion_clienteSModel.findAll({
        })
        res.json(direccion)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getDireccion = async (req, res) => {
    try {
        const direccion = await Direccion_clienteSModel.findAll({
            where: { id_direccion: req.params.id_direccion }
        })
        res.json(direccion[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Crear un registro
export const createDireccion = async (req, res) => {
    try {
        const { id_cliente, provincia, canton, distrito, barrio, otras_sennas } = req.body;

        // Verifica si existe un agente de ventas con el ID proporcionado
        const cliente = await ClienteSModel.findOne({
            where: { id_cliente }
        });

        if (!cliente) {
            return res.json({ message: 'No se encontró un cliente con el ID proporcionado' });
        }

        // Crea la dirección y establece la relación con el agente de ventas
        const direccion = await Direccion_clienteSModel.create({
            provincia,
            canton,
            distrito,
            barrio,
            otras_sennas,
            id_cliente
        });

        // Obtén el ID de la dirección creada
        const id_direccion = direccion.id_direccion;

        res.json({
            id_direccion,
            "message": "¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
//Actualizar un registro
export const updateDireccion = async (req, res) => {
    try {
        await Direccion_clienteSModel.update(req.body, {
            where: { id_direccion: req.params.id_direccion }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Eliminar un registro
export const deleteDireccion = async (req, res) => {
    try {
        await Direccion_clienteSModel.destroy({
            where: { id_direccion: req.params.id_direccion }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}