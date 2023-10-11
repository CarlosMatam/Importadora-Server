import express from 'express'
import { crearFactura, obtenerUltimoIDFactura, getAllFacturas, deleteFactura, updateFactura, getFacturaById, obtenerDetalleFactura, actualizarDetalleFactura } from '../controllers/FacturacionController.js'
const router = express.Router()


router.post('/', crearFactura)
router.get('/ultimoID', obtenerUltimoIDFactura)
router.get('/', getAllFacturas)
router.delete('/:id_factura', deleteFactura)
router.put('/:id_factura', updateFactura)
router.get('/:id_factura', getFacturaById)
router.get('/:id_factura/detalle', obtenerDetalleFactura)
router.put('/:id_factura/detalle', actualizarDetalleFactura)


export default router
