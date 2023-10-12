
import express from 'express'
import { getAllProveedor, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controllers/ProveedorController.js'
const router = express.Router()

router.get('/', getAllProveedor)
router.get('/:id_proveedor', getProveedor)
router.post('/', createProveedor)
router.put('/:id_proveedor', updateProveedor)
router.delete('/:id_proveedor', deleteProveedor)

export default router

