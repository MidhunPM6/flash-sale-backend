import { loginService } from '../service/loginService.js'
import { STATUS } from '../utils/statusCode.js'
import { generateAccessToken,generateRefreshToken } from '../utils/jwtToken.js'


export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('All fields are required')
  }
  try {
    const response = await loginService(email, password)
    console.info(response)
    if (response) {
      const accessToken = generateAccessToken(response)
      const refreshToken = generateRefreshToken(response) 
        .status(STATUS.SUCCESS)
        .json({ message: 'Login successful', accessToken, refreshToken})
    }
  } catch (error) {
    return res.status(STATUS.INTERNAL_ERROR).json({ message: error.message })
  }
}
