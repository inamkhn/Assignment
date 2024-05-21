import express from 'express'
import {createProduct } from '../Controller/productController.js'
import { isAuthenticated } from '../middleware/auth.js'


const router = express.Router()

router.route('/createproduct').post(createProduct) //isAuthenticated


export default router