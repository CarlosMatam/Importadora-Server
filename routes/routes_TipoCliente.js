


import express from 'express'
import { getAllTipo, getTipo, createTipo, updateTipo, deleteTipo } from '../controllers/Tipo_clienteController.js'
const router = express.Router()

router.get('/', getAllTipo)
router.get('/:id_tipo_cliente', getTipo)
router.post('/', createTipo)
router.put('/:id_tipo_cliente', updateTipo)
router.delete('/:id_tipo_cliente', deleteTipo)

export default router

