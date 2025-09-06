import Product from '../DB/productModel.js'

export const addProductService = async (productName, price, stock) => {
  if (!productName || !price || !stock) {
    throw new Error('All fields are required')
  }

  const newProduct = new Product({
    productName,
    price,
    stock
  })
  await newProduct.save()

  return newProduct
}

export const getProductService = async () => {
  const products = await Product.find({})
  if (!products) {
    throw new Error('No products found')
  } 
  return products
}


export const updateProductService =async(id, productName, price, stock,)=>{
    if (!id ||!productName ||!price ||!stock) {
        throw new Error('All fields are required')
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, { productName, price, stock }, { new: true }).lean()
    if (!updatedProduct) {
        throw new Error('Product not found')
    }
    return updatedProduct
} 