import express from "express"
import { PORT,mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookmodel.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
const app=express()

app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to my bookstore")
})

app.use('/books',booksRoute)

mongoose.connect(mongoDBURL)
.then(()=>{
console.log("App is connected to database");
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})
})
.catch((err)=>{
console.log(err);
})