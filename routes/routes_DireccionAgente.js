import express from 'express'
import { getAllDireccion, getDireccion, createDireccion, updateDireccion, deleteDireccion } from '../controllers/Direccion_agenteController.js'
const router = express.Router()

router.get('/', getAllDireccion)
router.get('/:id_direccion', getDireccion)
router.post('/', createDireccion)
router.put('/:id_direccion', updateDireccion)
router.delete('/:id_direccion', deleteDireccion)

export default router
