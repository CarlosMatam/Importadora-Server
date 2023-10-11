import express from 'express'
import { getAllCliente, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/ClienteController.js'
const router = express.Router()

router.get('/', getAllCliente)
router.get('/:id_cliente', getCliente)
router.post('/', createCliente)
router.put('/:id_cliente', updateCliente)
router.delete('/:id_cliente', deleteCliente)

export default router
