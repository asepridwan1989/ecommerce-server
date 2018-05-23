const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Joke = require('./../lib/joke')

const itemSchema = new Schema({
    name: String,
    imageUrl: String,
    category: String,
    price: Number,
    quantity: Number
})


let Item = mongoose.model('Item', itemSchema)
module.exports = Item
