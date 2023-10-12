import express from 'express'
import { getAllCompania, getCompania, createCompania, updateCompania, deleteCompania } from '../controllers/CompaniaController.js'
const router = express.Router()

router.get('/', getAllCompania)
router.get('/:id_compania', getCompania)
router.post('/', createCompania)
router.put('/:id_compania', updateCompania)
router.delete('/:id_compania', deleteCompania)

export default router