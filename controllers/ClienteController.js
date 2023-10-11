//importamos el Modelo
import { ClienteSModel, Direccion_clienteSModel, Telefono_clienteSModel, Tipo_clienteSModel, TipoCSModel } from '../models/Relaciones_cliente.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllCliente = async (req, res) => {
    try {
        const cliente = await ClienteSModel.findAll({
            include:
                [Direccion_clienteSModel, Telefono_clienteSModel, Tipo_clienteSModel, TipoCSModel]


        })
        res.json(cliente)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteSModel.findAll({
            where: { id_cliente: req.params.id_cliente }
        })
        res.json(cliente[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createCliente = async (req, res) => {
    try {
        const cliente = await ClienteSModel.create(req.body)
        const clienteId = cliente.id_cliente;

        res.json({
            id_cliente: clienteId,
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateCliente = async (req, res) => {
    const { id_cliente } = req.params;

    try {
        // Actualiza los datos del agente
        await ClienteSModel.update(
            {
                nombre: req.body.nombre,
                apellido_paterno: req.body.apellido_paterno,
                apellido_materno: req.body.apellido_materno,
                id_tipo_cliente: req.body.id_tipo_cliente,
                correo: req.body.correo,
                tipo_cedula: req.body.tipo_cedula,
                cedula: req.body.cedula,
            },
            {
                where: { id_cliente },
            }
        );

        // Actualiza los teléfonos del agente
        await Telefono_clienteSModel.update(
            {
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                telefono_3: req.body.telefono_3,
            },
            {
                where: { id_cliente },
            }
        );

        // Actualiza las direcciones del agente
        await Direccion_clienteSModel.update(
            {
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                barrio: req.body.barrio,
                otras_sennas: req.body.otras_sennas,
            },
            {
                where: { id_cliente },
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
export const deleteCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;

        // Buscar el agente de ventas por su ID junto con sus relaciones asociadas
        const cliente = await ClienteSModel.findOne({
            where: { id_cliente },
            include: [Telefono_clienteSModel, Direccion_clienteSModel]
        });

        if (!cliente) {
            return res.json({ message: 'No se encontró un cliente con el ID proporcionado' });
        }

        // Eliminar las relaciones asociadas (telefonos y direcciones)
        await Telefono_clienteSModel.destroy({
            where: { id_cliente }
        });

        await Direccion_clienteSModel.destroy({
            where: { id_cliente }
        });

        // Eliminar el agente de ventas
        await cliente.destroy();

        res.json({
            message: '¡Registro eliminado correctamente!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
