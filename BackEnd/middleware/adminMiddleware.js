
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader){
     res.status(StatusCodes.UNAUTHORIZED).send("invalid authentication")
  }
  else if (!authHeader || !authHeader.startsWith('Bearer ')) {
       res.status(StatusCodes.UNAUTHORIZED).send("invalid authentication")
      
  }
  else {
     const token = authHeader.split(' ')[1]
      // console.log(token);
    
    
      try {
          
        const payload = jwt.verify(token, process.env.JWT_SECRET)
          req.user_id = payload.user_id
  
      
      } catch (error) {
      
        res.status(StatusCodes.UNAUTHORIZED).send("invalid authentication")
       
      }


  }
     
}

module.exports = adminAuth