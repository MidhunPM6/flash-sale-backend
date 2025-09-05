import { registerService } from '../service/registerService.js'
import { STATUS } from '../utils/statusCode.js'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name || !email || !password) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: 'All fields are required' })
    }

    const response = await registerService(name, email, password)
    if (response) {
      return res
        .status(STATUS.CREATED)
        .json({ message: 'User registered successfully', data: response })
    }
  } catch (error) {

      return res
        .status(STATUS.INTERNAL_ERROR)
        .json({ message: error.message })}
  }


