//importamos el Modelo
import { Agente_ventaSModel, Direccion_agenteSModel, Telefono_agenteSModel, ZonaSModel } from '../models/Relaciones_agente_ventas.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllAgente = async (req, res) => {
    try {
        const agente = await Agente_ventaSModel.findAll({
            include:
                [Direccion_agenteSModel, Telefono_agenteSModel, ZonaSModel]


        })
        res.json(agente)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getAgente = async (req, res) => {
    try {
        const agente = await Agente_ventaSModel.findAll({
            where: { id_agente: req.params.id_agente }
        })
        res.json(agente[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createAgente = async (req, res) => {
    try {
        const agenteDeVentas = await Agente_ventaSModel.create(req.body)
        const agenteVentaId = agenteDeVentas.id_agente;

        res.json({
            id_agente: agenteVentaId,
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateAgente = async (req, res) => {
    const { id_agente } = req.params;

    try {
        // Actualiza los datos del agente
        await Agente_ventaSModel.update(
            {
                nombre: req.body.nombre,
                apellido_paterno: req.body.apellido_paterno,
                apellido_materno: req.body.apellido_materno,
                comision_por_venta: req.body.comision_por_venta,
                id_zona: req.body.id_zona,
                identificacion: req.body.identificacion,
            },
            {
                where: { id_agente },
            }
        );

        // Actualiza los teléfonos del agente
        await Telefono_agenteSModel.update(
            {
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                telefono_3: req.body.telefono_3,
            },
            {
                where: { id_agente },
            }
        );

        // Actualiza las direcciones del agente
        await Direccion_agenteSModel.update(
            {
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                barrio: req.body.barrio,
                otras_sennas: req.body.otras_sennas,
            },
            {
                where: { id_agente },
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
//Eliminar un registro
export const deleteAgente = async (req, res) => {
    try {
        const { id_agente } = req.params;

        // Buscar el agente de ventas por su ID junto con sus relaciones asociadas
        const agente = await Agente_ventaSModel.findOne({
            where: { id_agente },
            include: [Telefono_agenteSModel, Direccion_agenteSModel]
        });

        if (!agente) {
            return res.json({ message: 'No se encontró un agente de ventas con el ID proporcionado' });
        }

        // Eliminar las relaciones asociadas (telefonos y direcciones)
        await Telefono_agenteSModel.destroy({
            where: { id_agente }
        });

        await Direccion_agenteSModel.destroy({
            where: { id_agente }
        });

        // Eliminar el agente de ventas
        await agente.destroy();

        res.json({
            message: '¡Registro eliminado correctamente!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
