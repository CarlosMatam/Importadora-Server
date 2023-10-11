import express from 'express'
import { getAllTipo, getTipo, createTipo, updateTipo, deleteTipo } from '../controllers/TipoCedulaController.js'
const router = express.Router()

router.get('/', getAllTipo)
router.get('/:id_tipo_cedula', getTipo)
router.post('/', createTipo)
router.put('/:id_tipo_cedula', updateTipo)
router.delete('/:id_tipo_cedula', deleteTipo)

export default router

