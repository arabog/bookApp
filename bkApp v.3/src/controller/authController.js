const User = require('../models/user')
const bcrypt = require('bcrypt')
const { createToken } = require('../services/jwtService')


exports.registerNewUser = (req, res) => {
          User.findOne( { username: req.body.username }, (err, existingUser) => {
                    // if user with username exist
                    if(err) {
                              return res.status(500).json({err})
                    }

                    if(existingUser) {
                              return res.status(400).json({message: 'A user with this username already exists'})
                    }

                    // if no error cr8 new user
                    User.create( {
                              firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              username: req.body.username,
                    }, (err, newUser) => {
                              if(err) {
                                        return res.status(500).json({err})
                              }
                              // hash user password
                              bcrypt.genSalt(10, (err, salt) => {
                                        if(err) {
                                                  return res.status(500).json({ err })
                                        }

                                        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                                                  if(err) {
                                                            return res.status(500).json({ err })
                                                  }

                                                  // save pasword to db
                                                  newUser.password = hashedPassword
                                                  newUser.save((err, savedUser) => {
                                                            if(err) {
                                                                      return res.status(500).json({err})
                                                            }

                                                            // create jwt for user
                                                            let token = createToken(newUser)
                                                            if(!token) {
                                                                      return res.status(500).json({message: "sorry, we could not authenticate you. pls login"})
                                                            }
                                                            // send token to user
                                                            return res.status(200).json(
                                                                      {
                                                                                message: "user registration sucessful",
                                                                                token
                                                                      }
                                                            )
                                                  })
                                        })
                              })
                    })
          })
}


exports.loginUser = (req, res) => {
          User.findOne({username: req.body.username}, (err, foundUser) => {
                    if(err) {
                              return res.status(500).json( { err } )
                    }

                    if(!foundUser) {
                              return res.status(401).json({message: 'Incorrect username'})
                    }
                  
                    // compare passwords                                                       usersaved password
                    // check if password is correct
                    let match = bcrypt.compareSync(req.body.password, foundUser.password)

                    // res.json({match})
                    if(!match) {
                              return res.status(401).json({message: "incorrect password"})
                    }

                    // cr8 a token
                    let token = createToken(foundUser)
                    if(!token) {
                              return res.status(500).json({message: "sorry, we could not authenticate you. pls login"})
                    }

                    // send token to user
                    return res.status(200).json({
                              message: "user logged in",
                              token
                    })
                              
                    
                    
          })
}