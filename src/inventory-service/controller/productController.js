
import {
  addProductService,
  getProductService,
  reserveProductService,
  updateProductService
} from '../service/productService.js'
import { kafkaProducer } from '../utils/kafka.js'
import { STATUS } from '../utils/statusCode.js'

export const addProductController = async (req, res) => {
  const { productName, price, stock } = req.body

  try {
    if (!productName || !price || !stock) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: 'All fields are required' })
    }
    const product = await addProductService(productName, price, stock)
    return res.status(STATUS.SUCCESS).json({
      message: 'Product added successfully',
      data: product
    })
  } catch (error) {
    return res.status(STATUS.INTERNAL_ERROR).json({ message: error.message })
  }
}

export const getProductController = async (req, res) => {
  try {
    const product = await getProductService(req.params.id)
    if (!product) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'Product not found' })
    }
    return res
      .status(STATUS.SUCCESS)
      .json({ message: 'Product retrieved successfully', data: product })
  } catch (error) {
    return res.status(STATUS.INTERNAL_ERROR).json({ message: error.message })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { id, productName, price, stock } = req.body
    console.log(id, productName, price, stock)

    if (!productName || !price || !stock) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: 'All fields are required' })
    }
    const updatedProduct = await updateProductService(
      id,
      productName,
      price,
      stock
    )
    if (!updatedProduct) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'Product not found' })
    }
    return res
      .status(STATUS.SUCCESS)
      .json({ message: 'Product updated successfully', data: updatedProduct })
  } catch (error) {
    return res.status(STATUS.INTERNAL_ERROR).json({ message: error.message })
  }
}

export const reserveProductController = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    if (!productId || !quantity) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: 'Product ID is required' })
    }
    const reservedProduct = await reserveProductService(productId, quantity)
    if (!reservedProduct) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ success: false, message: 'Insufficient stock' })
    }
    
    return res
      .status(STATUS.SUCCESS)
      .json({ message: 'Product reserved successfully', data: reservedProduct })
  } catch (error) {
    return res.status(STATUS.INTERNAL_ERROR).json({ message: error.message })
  }
}
