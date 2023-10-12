import express from 'express'
import { getAllCobro, getCobro, createCobro, updateCobro, deleteCobro } from '../controllers/CobroController.js'
const router = express.Router()

router.get('/', getAllCobro)
router.get('/:id_cobro', getCobro)
router.post('/', createCobro)
router.put('/:id_cobro', updateCobro)
router.delete('/:id_cobro', deleteCobro)

export default router
