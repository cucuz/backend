const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const dotenv = require('dotenv');
dotenv.config();


const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
   // get the token from the body of the request
   req.body.token || req.headers.authorization && req.headers.authorization.startsWith('token')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Invalid token')
  }
})

module.exports = { protect }
