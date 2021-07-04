const { decodeToken } = require("../services/jwtService")


exports.authenticateUser = (req, res, next) => {
          // check if dreis an authorization token
          if(!req.headers.authorization) {
                    return res.status(401).json({message: "authorization header required"})
          }

          let splittedHeader = req.headers.authorization.split(' ')

          if(splittedHeader[0] !== "Bearer") {
                    return res.status(401).json({ message: "authorization format is Bearer <token>"})
          }  

          let token = splittedHeader[1]

          // decode token
         let decodedToken = decodeToken(token)

          // check if valid
          // no user--check if valid
          if(!decodedToken) {
                    return res.status(401).json({messsage: 'user not found'})
          }else {
                    // allow user to continue its request
                    req.user = decodedToken;
                    next()

          }
}


exports.checkIfAdmin = (req, res, next) => {
          if(req.user.role !== "admin" ) {
                    return res.status(401).json({ message: "this route is restricted to admin users"})
          }

          return next()
}
