//importamos el Modelo
import { TransporteSModel, Telefono_transporteSModel } from "../models/Relaciones_transporte.js"

//** Métodos CRUD **/

//Crear registro
export const createTransporte = async (req, res) => {
    try {
        const transporte = await TransporteSModel.create(req.body)
        const transporteId = transporte.id_transporte;

        res.json({
            id_transporte: transporteId,
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
};

//Eliminar registro
export const deleteTransporte = async (req, res) => {
    try {
        const { id_transporte } = req.params;

        // Buscar el agente de ventas por su ID junto con sus relaciones asociadas
        const transporte = await TransporteSModel.findOne({
            where: { id_transporte },
            include: [Telefono_transporteSModel]
        });

        if (!transporte) {
            return res.json({ message: 'No se encontró un transporte con el ID proporcionado' });
        }

        // Eliminar las relaciones asociadas (telefonos y direcciones)
        await Telefono_transporteSModel.destroy({
            where: { id_transporte }
        });

        // Eliminar el agente de ventas
        await transporte.destroy();

        res.json({
            message: '¡Registro eliminado correctamente!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Modificar registro
export const updateTransporte = async (req, res) => {
    const { id_transporte } = req.params;

    try {
        // Actualiza los datos del agente
        await TransporteSModel.update(
            {
                nombre: req.body.nombre,
            },
            {
                where: { id_transporte },
            }
        );

        // Actualiza los teléfonos del agente
        await Telefono_transporteSModel.update(
            {
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                telefono_3: req.body.telefono_3,
            },
            {
                where: { id_transporte },
            }
        );
        res.json({
            message: "Registro actualizado correctamente",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




//Buscar un registro
export const getTransporte = async (req, res) => {
    try {
        const transporte = await TransporteSModel.findAll({
            where: { id_transporte: req.params.id_transporte }
        })
        res.json(transporte[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllTransporte = async (req, res) => {
    try {
        const transporte = await TransporteSModel.findAll({
            include:
                [Telefono_transporteSModel]


        })
        res.json(transporte)
    } catch (error) {
        res.json({ message: error.message })
    }
}