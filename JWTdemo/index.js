const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const PORT = 5000;
const secret = "supERdupERBigsEcreT";

app.use(express.json())


// cr8 a token and send back to client
app.post('/create-token', (req, res) => {
          // dont include sensitive info in ur jwt eg password, payment info
          // payload: contains info u r coding
          const payload = {
                    username: req.body.username,
                    id: req.body.id
                    // dont include password
          };
          // secret
          secret;

          // expiry time
          const expiry = 36000;

          // create token
          jwt.sign(payload, secret,  { expiresIn: expiry }, (err, token) => {
                    if(err) {
                              return res.status(500).json( {err} )
                    }else {
                              return res.status(200).json({ token })
                    }
          })
})

// receive a token from client and decode
app.get('/decode-token', (req, res) => {
          // console.log(req.headers);

          // pick auth headers
          if(!req.headers.authorization) {
                    return res.status(403).json({ message: "authentication token is requiired"})
          }
          
          const authHeader = req.headers.authorization;
          // console.log(authHeader);

          // extract token (contains Bearer token)
          const splittedStr = authHeader.split(' ')
          const token = splittedStr[1]

          // decode token
          jwt.verify(token, secret, (err, decodedToken) => {
                    if(err) {
                              return res.status(500).json( { err } )
                    }else {
                              return res.status(200).json( {user: decodedToken})
                    }
          })
})


app.listen(PORT, () => console.log('app started'))