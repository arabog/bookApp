const User = require('../models/user')
const bcrypt =  require("bcrypt")
let password = "admin123"

exports.seedAdmin = () => {
          // check if dre is an admin acct
          User.findOne({ role: "admin" }, (err, admin) => {
                    if(err) throw err

                    if(admin) {
                              return "admin account already exists"
                    }

                    // console.log(password);

                    // else cr8 new admin
                    User.create({
                              firstName: "Book",
                              lastName: "Goblin",
                              username: "bookgoblin",
                              role: "admin",
                    }, (err, user) => {
                              if(err) throw err

                              bcrypt.genSalt(10, (err, salt) => {
                                        if(err) throw err

                                        bcrypt.hash(password, salt, (err, hash) => {
                                                  if(err) throw err
                                                  
                                                  user.password = hash
                                                  user.save((err, savedUser) => {
                                                            if(err) throw err
                                                            return "admin account created"
                                                  })
                                        })
                              })
                    })

          })
}
// if dre is none, cr8 an admin acct
