const mongoose = require('mongoose');
const productData = new mongoose.Schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageUrl: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productData)