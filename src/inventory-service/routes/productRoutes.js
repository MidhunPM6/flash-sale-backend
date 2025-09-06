import express from 'express'
import { addProductController ,getProductController,updateProductController,reserveProductController} from '../controller/productController.js'

const productRoutes = express.Router()

productRoutes.post('/add-product', addProductController)
productRoutes.get('/get-product', getProductController)
productRoutes.put('/update-stock', updateProductController)
productRoutes.put('/reserve-product', reserveProductController)

export default productRoutes
