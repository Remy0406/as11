const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const saveBook = (data) => {
    let results = JSON.stringify(data);
    fs.writeFileSync("db.json", results)
}

app.get('/', (req, res) => {
  res.send('Dude!')
})

const books = require('./db')
app.get('/books', (req, res) => {
  res.send(books)
})

app.get('/books/:id', (req, res) => {
    res.send(books.find(book => book.id == req.params.id))
})  

app.post('/books', (req, res) => {
    books.push(req.body)
    saveBook(books)
    res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(x => x.id == req.params.id)
    Object.assign(books[updateIndex], req.body)
    saveBook(books)
    res.status(200).json(req.body)
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deletedIndex, 1)
    saveBook(books)
    res.status(204).send()
 })

app.listen(4444, () => {
  console.log(`Example app listening on port ${4444}`)
})