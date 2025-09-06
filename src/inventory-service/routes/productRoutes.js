import express from 'express'
import { addProductController ,getProductController,updateProductController} from '../controller/productController.js'

const productRoutes = express.Router()

productRoutes.post('/add-product', addProductController)
productRoutes.get('/get-product', getProductController)
productRoutes.put('/update-stock', updateProductController)

export default productRoutes
