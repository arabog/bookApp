const Book = require('../models/book')

exports.createNewBook = (req, res) => {
          // app.post('/books', function(req, res) {
          // const book = req.body.book

          Book.create({
                              // title: req.body.title,
                              // author: req.body.author,
                              // description: req.body.description,
                              // category: req.body.category,
                              // purchaseCount: req.body.purchaseCount,
                              // imageUrl: req.body.imageUrl,
                              // tags: req.body.tags,
                              // color: req.body.color
                              ...req.body
                    }, (err, newBook) => {
                              if(err) {
                                        return res.status(500).json({message: err})
                              }else {
                                        return res.status(200).json({message: "new book created", newBook})
                              }
                    }
          )
// })
}

exports.fetchBooks = (req, res) => {
          // app.get('/books', (req, res) => {
                    console.log({user: req.user});

                    let conditions = {};

                    if(req.query.category) {
                              conditions.category = req.query.category
                    }

                    if(req.query.author) {
                              conditions.author= req.query.author
                    }

                    console.log(conditions);

                    // find all books
                    Book.find({ }, (err, books) => {
                              if(err) {
                                        return res.status(500).json({message: err})
                              }else {
                                        return res.status(200).json({books})
                              }
                    }) 
          // })
          
}

exports.fetchSingleBook = (req, res) => {
          // app.get('/books/:id', (req, res) => {
                    Book.findById(req.params.id, (err, book) => {
                              if(err) {
                                        return res.status(500).json({message: err})
                              }else if(!book) {
                                        return res.status(404).json({message: 'book not found'})
                              }else {
                                        return res.status(200).json({book})
                              }
                    })
          // })
}

exports.updateSingleBooks = (req, res) => {
          // app.put('/books/:id', (req, res) =>{
                    // oda method is findOneAndUpdate
                              Book.findByIdAndUpdate(req.params.id, {
                                        title: req.body.title,
                                        category: req.body.category
                              }, (err, book) => {
                                        if(err) {
                                                  return res.status(500).json({message: err})
                                        }else if(!book) {
                                                  return res.status(404).json({message: 'book not found'})
                                        }else {
                                                  book.save((err, saveBook) => {
                                                            if(err) {
                                                                      return res.status(400).json({message: err})
                                                            }else {
                                                                      return res.status(200).json({message: 'book updated successfully'})
                                                            }
                                                  }) 
                                        }
                              }
                              
                              )
                    // })
}

exports.deleteSingleBook = (req, res) => {
          // app.delete('/books/:id', (req, res) => {
                    Book.findByIdAndDelete(req.params.id, (err, book) => {
                              if(err) {
                                        return res.status(500).json({message: err})
                              }else if(!book) {
                                        return res.status(400).json({message: 'book was not found'})
                              }else {
                                        return res.status(200).json({message: 'book deleted successfully'})
                              }
                    })
          // })
}