import express from 'express'
import { getAllTelefono, getTelefono, createTelefono, updateTelefono, deleteTelefono } from '../controllers/Telefono_transporteController.js'
const router = express.Router()

router.get('/', getAllTelefono)
router.get('/:id_telefono', getTelefono)
router.post('/', createTelefono)
router.put('/:id_telefono', updateTelefono)
router.delete('/:id_telefono', deleteTelefono)

export default router
