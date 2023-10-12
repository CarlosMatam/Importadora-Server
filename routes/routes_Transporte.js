import express from 'express'
import { getAllTransporte, getTransporte, createTransporte, updateTransporte, deleteTransporte } from '../controllers/TransporteController.js'
const router = express.Router()

router.get('/', getAllTransporte)
router.get('/:id_transporte', getTransporte)
router.post('/', createTransporte)
router.put('/:id_transporte', updateTransporte)
router.delete('/:id_transporte', deleteTransporte)

export default router