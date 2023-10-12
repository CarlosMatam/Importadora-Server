import { TransporteSModel, Telefono_transporteSModel } from "../models/Relaciones_transporte.js"

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllTelefono = async (req, res) => {
    try {
        const telefono = await Telefono_transporteSModel.findAll({
        })
        res.json(telefono)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getTelefono = async (req, res) => {
    try {
        const telefono = await Telefono_transporteSModel.findAll({
            where: { id_telefono: req.params.id_telefono }
        })
        res.json(telefono[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Crear un registro
export const createTelefono = async (req, res) => {
    try {
        const { id_transporte, telefono_1, telefono_2, telefono_3, } = req.body;

        // Verifica si existe un agente de ventas con el ID proporcionado
        const transporte = await TransporteSModel.findOne({
            where: { id_transporte }
        });

        if (!transporte) {
            return res.json({ message: 'No se encontró un transporte con el ID proporcionado' });
        }

        // Crea el teléfono y establece la relación con el agente de ventas
        const telefono = await Telefono_transporteSModel.create({
            telefono_1,
            telefono_2,
            telefono_3,
            id_transporte
        });

        // Obtén el ID del teléfono creado
        const id_telefono = telefono.id_telefono;

        res.json({
            id_telefono,
            "message": "¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
//Actualizar un registro
export const updateTelefono = async (req, res) => {
    try {
        await Telefono_transporteSModel.update(req.body, {
            where: { id_telefono: req.params.id_telefono }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Eliminar un registro
export const deleteTelefono = async (req, res) => {
    try {
        await Telefono_transporteSModel.destroy({
            where: { id_telefono: req.params.id_telefono }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}