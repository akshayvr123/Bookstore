import express from 'express'
import { Book } from '../models/bookmodel.js';

const router=express.Router()


//Route for save a new book

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
            
            
        ) {
            return res.status(400).send({
                message: "Send all required fields:title,author,publishYear"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/', async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }

}) 

//Route to update a book

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            })
        }
        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book updated  successfully" })

    } catch (err) {
        console.log(err.message);
        res.send(500).send({ message: err.message })
    }
})

//Route to delete a book

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return res.status(404)
        }
        return res.status(200).send({ message: "Book deleted successfully" })
    } catch (err) {
        console.log(err.message);
        res.send(500).send({ message: err.message })
    }
})

export default router