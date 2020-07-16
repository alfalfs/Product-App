const express = require('express');
const cors = require('cors');
const app = express();
const productData = require('./src/models/product_data');
var { Product } = require('../models/product_data');
// db connection
const { mongoose } = require('./config/db.js');
app.use(cors());
// app.use(cors({
//     "origin": 'http://localhost:4200',
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //body parser inbuild in express


app.listen(process.env.PORT || 3000, () => console.log('Listening to port 3000'));

//app.use('/products', productController);

app.get('/products', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    ProductData.find()
        .then((products) => {
            console.log(products);
            res.send(products);
        })
})

app.get('/singleProduct/:pid', (req, res) => {
    let pid = req.params.pid;
    console.log(pid, typeof pid, pid.length);
    ProductData.findById(pid)
        .then((product) => {
            console.log('single product set', product);
            res.status(200).json({ product });
        })
})

// Delete employee
app.delete('/products/:id', (req, res) => {
    ProductData.findByIdAndRemove(req.params.id)
        .then(() => {
            console.log('Deleted')
        })
        .catch((err) => {
            console.log('Error is: ', err)
        })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

app.post('/insert', verifyToken, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();
});

app.post('/edit', verifyToken, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);
    let pid = req.body.pid;
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    ProductData.findByIdAndUpdate(pid, product)
        .then(() => {
            console.log('Updated successfully')
        })
        .catch((err) => {
            console.log("Error is: ", err)
        })
});