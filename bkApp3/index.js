const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 8000
const dbSetup = require('./src/database/setup')

// reoutes
const authRoutes = require('./src/routes/authRoute')
const bookRoutes = require('./src/routes/bookRoutes')

// SEEDER
const { seedAdmin } = require("./src/seeders/admin")
console.log(seedAdmin());

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// setup db
dbSetup()

/*
app.get('/books/:id', (req, res) => {
          Book.findOne({_id: req.params.id}, (err, book) => {
                    if(err) {
                              return res.status(500).json({message: err})
                    }else if(!book) {
                              return res.status(404).json({message: 'book not found'})
                    }else {
                              return res.status(200).json({book})
                    }
          })
})

*/

// findOneAndDelete
// findoneandremove
// findByIdAndDelete
// findByIdandremove

app.use('/auth', authRoutes)
app.use(bookRoutes)


app.listen(port, () => {
          console.log(`Server running on port ${port}`);
})