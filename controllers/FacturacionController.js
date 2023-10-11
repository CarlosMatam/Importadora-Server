import { FacturacionSModel, DetalleFacturaSModel, ClienteSModel, CompaniasSModel, TipoFacturaSModel } from '../models/Facturacion.js';
import { actualizarExistenciaProductos } from './ProductoController.js';
import { Op } from 'sequelize';

// Crear una factura
export const crearFactura = async (req, res) => {
    try {
        // Obtener los datos de la factura del cuerpo de la solicitud
        const {
            id_compania,
            id_tipo_factura,
            id_cliente,
            fecha,
            vencimiento,
            detallesFactura, // Array de objetos de detalle de factura
            total,
        } = req.body;

        // Crear la factura en la base de datos
        const factura = await FacturacionSModel.create({
            id_compania,
            id_tipo_factura,
            id_cliente,
            fecha,
            vencimiento,
            total,

        });

        // Crear los registros de detalle de factura asociados a la factura creada
        await Promise.all(
            detallesFactura.map(async (detalle) => {
                await DetalleFacturaSModel.create({
                    id_factura: factura.id_factura,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    subtotal: detalle.cantidad * detalle.precio,
                    descuento: detalle.descuento,
                });
            })
        );
        await actualizarExistenciaProductos(detallesFactura);

        res.json({ message: 'Factura creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la factura' });
    }
};

// Obtener el último ID de factura
export const obtenerUltimoIDFactura = async (req, res) => {
    try {
        const ultimoID = await FacturacionSModel.max('id_factura');
        res.json({ ultimoID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el último ID de factura' });
    }
};

//Mostrar todos los registros
export const getAllFacturas = async (req, res) => {
    try {
        const Facturas = await FacturacionSModel.findAll({
            include:
                [DetalleFacturaSModel, ClienteSModel, CompaniasSModel, TipoFacturaSModel]


        })
        res.json(Facturas)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteFactura = async (req, res) => {
    const { id_factura } = req.params;

    try {
        // Eliminar los detalles de factura relacionados manualmente
        await DetalleFacturaSModel.destroy({
            where: { id_factura },
        });

        // Eliminar la factura
        await FacturacionSModel.destroy({
            where: { id_factura },
        });

        res.status(200).json({ message: 'Factura y detalles eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFactura = async (req, res) => {
    const facturaId = req.params.id_factura;

    try {
        // Actualizar la factura
        await FacturacionSModel.update(req.body, {
            where: { id_factura: facturaId },
        });

        // Actualizar el detalle de la factura
        const detalleFactura = req.body.detalleFactura;

        if (detalleFactura && detalleFactura.length > 0) {
            // Obtener los IDs de los detalles existentes
            const existingDetalleIds = detalleFactura
                .filter((detalle) => detalle.id_detalle_factura)
                .map((detalle) => detalle.id_detalle_factura);

            // Eliminar los detalles existentes que no están en la nueva lista
            await DetalleFacturaSModel.destroy({
                where: {
                    id_detalle_factura: {
                        [Op.notIn]: existingDetalleIds,
                    },
                    id_factura: facturaId,
                },
            });

            // Actualizar o insertar los detalles de la factura
            for (const detalle of detalleFactura) {
                if (detalle.id_detalle_factura) {
                    // Actualizar el detalle existente
                    await DetalleFacturaSModel.update(detalle, {
                        where: { id_detalle_factura: detalle.id_detalle_factura },
                    });
                } else {
                    // Insertar un nuevo detalle
                    await DetalleFacturaSModel.create({
                        ...detalle,
                        id_factura: facturaId,
                    });
                }
            }
        }

        res.sendStatus(200); // OK
    } catch (error) {
        console.error('Error al editar la factura:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const getFacturaById = async (req, res) => {
    const facturaId = req.params.id_factura;

    try {
        const factura = await FacturacionSModel.findByPk(facturaId, {
            include: [DetalleFacturaSModel],
        });

        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        res.json(factura);
    } catch (error) {
        console.error('Error al obtener la factura:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerDetalleFactura = async (req, res) => {
    const facturaId = req.params.id_factura;

    try {
        // Obtener los detalles de la factura asociados a la facturaId
        const detalles = await DetalleFacturaSModel.findAll({
            where: { id_factura: facturaId },
        });

        res.status(200).json(detalles);
    } catch (error) {
        console.error('Error al obtener los detalles de la factura:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



export const actualizarDetalleFactura = async (req, res) => {
    const facturaId = req.params.id_factura;
    const detallesFactura = req.body.detallesFactura;

    if (!detallesFactura || !Array.isArray(detallesFactura)) {
        return res.status(400).json({ message: 'Los detalles de la factura deben ser proporcionados como un arreglo' });
    }

    try {
        // Eliminar los detalles de factura existentes asociados a la facturaId
        await DetalleFacturaSModel.destroy({
            where: { id_factura: facturaId },
        });

        // Crear los nuevos registros de detalle de factura asociados a la facturaId
        await DetalleFacturaSModel.bulkCreate(detallesFactura);

        res.status(200).json({ message: 'Detalles de factura actualizados correctamente' });
    } catch (error) {
        console.error('Error al actualizar los detalles de la factura:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};