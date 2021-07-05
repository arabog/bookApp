const express = require('express')
const router = express.Router()
const BookCtrl = require('../controller/bookController')
const { authenticateUser, checkIfAdmin } = require("../middlewares/authentication")

router.post('/books', authenticateUser, checkIfAdmin, BookCtrl.createNewBook)

router.get('/books', authenticateUser, BookCtrl.fetchBooks)

router.get('/books/:id', authenticateUser, BookCtrl.fetchSingleBook)

router.put('/books/:id', authenticateUser, BookCtrl.updateSingleBooks)

router.delete('/books/:id', authenticateUser, BookCtrl.deleteSingleBook)

module.exports = router

