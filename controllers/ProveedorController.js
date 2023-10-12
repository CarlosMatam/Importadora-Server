//importamos el Modelo
import { ProveedorSModel, Direccion_proveedorSModel, Telefono_proveedorSModel, TipoCSModel } from '../models/Relaciones_proveedor.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorSModel.findAll({
            include:
                [Direccion_proveedorSModel, Telefono_proveedorSModel, TipoCSModel]


        })
        res.json(proveedor)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorSModel.findAll({
            where: { id_proveedor: req.params.id_proveedor }
        })
        res.json(proveedor[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorSModel.create(req.body)
        const proveedorId = proveedor.id_proveedor;

        res.json({
            id_proveedor: proveedorId,
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateProveedor = async (req, res) => {
    const { id_proveedor } = req.params;

    try {
        // Actualiza los datos del agente
        await ProveedorSModel.update(
            {
                nombre: req.body.nombre,
                correo: req.body.correo,
                tipo_cedula: req.body.tipo_cedula,
                cedula: req.body.cedula,

            },
            {
                where: { id_proveedor },
            }
        );

        // Actualiza los teléfonos del agente
        await Telefono_proveedorSModel.update(
            {
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                telefono_3: req.body.telefono_3,
            },
            {
                where: { id_proveedor },
            }
        );

        // Actualiza las direcciones del agente
        await Direccion_proveedorSModel.update(
            {
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                barrio: req.body.barrio,
                otras_sennas: req.body.otras_sennas,
            },
            {
                where: { id_proveedor },
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
export const deleteProveedor = async (req, res) => {
    try {
        const { id_proveedor } = req.params;

        // Buscar el agente de ventas por su ID junto con sus relaciones asociadas
        const proveedor = await ProveedorSModel.findOne({
            where: { id_proveedor },
            include: [Telefono_proveedorSModel, Direccion_proveedorSModel]
        });

        if (!proveedor) {
            return res.json({ message: 'No se encontró un proveedor con el ID proporcionado' });
        }

        // Eliminar las relaciones asociadas (telefonos y direcciones)
        await Telefono_proveedorSModel.destroy({
            where: { id_proveedor }
        });

        await Direccion_proveedorSModel.destroy({
            where: { id_proveedor }
        });

        // Eliminar el agente de ventas
        await proveedor.destroy();

        res.json({
            message: '¡Registro eliminado correctamente!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

