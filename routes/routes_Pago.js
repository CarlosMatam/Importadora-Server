import express from 'express'
import { getAllPago, getPago, createPago, updatePago, deletePago } from '../controllers/PagoController.js'
const router = express.Router()

router.get('/', getAllPago)
router.get('/:id_pago', getPago)
router.post('/', createPago)
router.put('/:id_pago', updatePago)
router.delete('/:id_pago', deletePago)

export default router
