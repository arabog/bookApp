const mongoose = require('mongoose')


// title: String,
// create shema
const bookSchema = new mongoose.Schema ({
          title: {
                    type: String,
                    required: true,
                    minLength: 5
          },
          author: String,
          description: String,
          category: {
                    type: String,
                    enum: ['fiction', 'non-fiction', 'comic', 'others'],
                    default: 'fiction'
          },
          purchaseCount: Number,
          imageUrl: String,
          tags: Array,
          color: String
})

const Book = mongoose.model('Book', bookSchema)


module.exports = Book