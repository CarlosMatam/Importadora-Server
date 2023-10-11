// Importar los modelos actualizados
import { ComprasSModel, DetalleComprasSModel, CompaniasSModel, ProveedorSModel, BodegaSModel, ProductoSModel } from "../models/Compra.js";

// Crear una compra
export const crearCompra = async (req, res) => {
    let transaction; // Variable para almacenar la transacción
    
    try {
        // Obtener los datos de la compra y los detalles de compra del cuerpo de la solicitud
        const {
            id_compania,
            id_bodega,
            id_proveedor,
            fecha,
            detallesCompra, // Array de objetos de detalle de compra
            total,
            descuento,
        } = req.body;

        // Crear la compra en la base de datos
        const compra = await ComprasSModel.create({
            id_compania,
            id_bodega,
            id_proveedor,
            fecha,
            total,
            descuento,
        });

        // Crear los registros de detalle de compra asociados a la compra creada
        await Promise.all(
            detallesCompra.map(async (detalle) => {
                await DetalleComprasSModel.create({
                    num_documento: compra.num_documento,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    porc_descuento: detalle.porc_descuento,
            
                    subtotal: detalle.cantidad * detalle.precio,
                    // Aquí puedes realizar los cálculos adicionales que necesites para cada detalle
                });

                // Luego, en el punto donde necesitas actualizar el producto
                const producto = await ProductoSModel.findByPk(detalle.id_producto);

                if (!producto) {
                    throw new Error(`Producto con ID ${detalle.id_producto} no encontrado`);
                }

                // Sumar la cantidad nueva a la existencia actual
                producto.existencia_actual = producto.existencia_actual + detalle.cantidad;
                

                // Guardar el producto actualizado
                await producto.save();
            })
        );

        res.json({ message: 'Compra creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la compra' });
    }
};


//Mostrar todos los registros
export const getAllCompras = async (req, res) => {
    try {
        const Compras = await ComprasSModel.findAll({
            include:
                [BodegaSModel, DetalleComprasSModel, CompaniasSModel, ProveedorSModel]
        })
        res.json(Compras)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const deleteCompra = async (req, res) => {
    const { num_documento } = req.params;

    try {
        // Eliminar los detalles de factura relacionados manualmente
        await DetalleComprasSModel.destroy({
            where: { num_documento },
        });

        // Eliminar la factura
        await ComprasSModel.destroy({
            where: { num_documento },
        });

        res.status(200).json({ message: 'Factura y detalles eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const updateCompra = async (req, res) => {
    const numeroDocumento = req.params.num_documento;

    try {
        // Actualizar la compra
        await ComprasSModel.update(req.body, {
            where: { num_documento: numeroDocumento },
        });

        // Actualizar el detalle de la compra
        const detalleCompra = req.body.detalleCompra;

        if (detalleCompra && detalleCompra.length > 0) {
            // Obtener los IDs de los detalles existentes
            const existingDetalleIds = detalleCompra
                .filter((detalle) => detalle.id_detalle)
                .map((detalle) => detalle.id_detalle);

            // Eliminar los detalles existentes que no están en la nueva lista
            await DetalleComprasSModel.destroy({
                where: {
                    id_detalle: {
                        [Op.notIn]: existingDetalleIds,
                    },
                    num_documento: numeroDocumento,
                },
            });

            // Actualizar o insertar los detalles de la compra
            for (const detalle of detalleCompra) {
                if (detalle.id_detalle) {
                    // Actualizar el detalle existente
                    await DetalleComprasSModel.update(detalle, {
                        where: { id_detalle: detalle.id_detalle },
                    });
                } else {
                    // Insertar un nuevo detalle
                    await DetalleComprasSModel.create({
                        ...detalle,
                        num_documento: numeroDocumento,
                    });
                }
            }
        }

        res.sendStatus(200); // OK
    } catch (error) {
        console.error('Error al editar la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const getCompraById = async (req, res) => {
    const compraId = req.params.num_documento;

    try {
        const compra = await ComprasSModel.findByPk(compraId, {
            include: [DetalleComprasSModel],
        });

        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        res.json(compra);
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerDetalleCompra = async (req, res) => {
    const compraId = req.params.num_documento;

    try {
        // Obtener los detalles de la compra asociados a la compraId
        const detalles = await DetalleComprasSModel.findAll({
            where: { num_documento: compraId },
        });

        res.status(200).json(detalles);
    } catch (error) {
        console.error('Error al obtener los detalles de la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarDetalleCompra = async (req, res) => {
    const compraId = req.params.num_documento;
    const detallesCompra = req.body.detallesCompra;

    if (!detallesCompra || !Array.isArray(detallesCompra)) {
        return res.status(400).json({ message: 'Los detalles de la compra deben ser proporcionados como un arreglo' });
    }

    try {
        // Eliminar los detalles de compra existentes asociados a la compraId
        await DetalleComprasSModel.destroy({
            where: { num_documento: compraId },
        });

        // Crear los nuevos registros de detalle de compra asociados a la compraId
        await DetalleComprasSModel.bulkCreate(detallesCompra);

        res.status(200).json({ message: 'Detalles de compra actualizados correctamente' });
    } catch (error) {
        console.error('Error al actualizar los detalles de la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};