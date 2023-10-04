import express from 'express'
import { getAllAgente, getAgente, createAgente, updateAgente, deleteAgente } from '../controllers/Agente_ventaController.js'
const router = express.Router()

router.get('/', getAllAgente)
router.get('/:id_agente', getAgente)
router.post('/', createAgente)
router.put('/:id_agente', updateAgente)
router.delete('/:id_agente', deleteAgente)

export default router
