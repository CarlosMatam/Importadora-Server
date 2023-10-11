import express from 'express'
import { crearCompra, getAllCompras, deleteCompra, updateCompra, getCompraById, obtenerDetalleCompra, actualizarDetalleCompra } from '../controllers/CompraController.js'
const router = express.Router()


router.post('/', crearCompra)
router.get('/', getAllCompras)
router.delete('/:num_documento', deleteCompra)
router.put('/:num_documento', updateCompra)
router.get('/:num_documento', getCompraById)
router.get('/:num_documento/detalle', obtenerDetalleCompra)
router.put('/:num_documento/detalle', actualizarDetalleCompra)


export default router
