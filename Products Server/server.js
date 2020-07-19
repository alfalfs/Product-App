const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const productData = require('./src/models/product_data');
// var { Product } = require('../models/product_data');
// db connection
const { mongoose } = require('./config/db.js');
app.use(express.static(path.join(__dirname, 'dist')));
const api = require('./src/routes/api');
app.use(cors({}));
// app.use(cors({
//     "origin": 'http://localhost:4200',
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //body parser inbuild in express


app.listen(process.env.PORT || 3000, () => console.log('Listening to port 3000'));
app.use('/api', api);
//app.use('/products', productController);

app.get('/products', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    productData.find()
        .then((products) => {
            console.log(products);
            res.send(products);
        })
})

app.get('/singleProduct/:pid', (req, res) => {
    let pid = req.params.pid;
    console.log(pid, typeof pid, pid.length);
    productData.findById(pid)
        .then((product) => {
            console.log('single product set', product);
            res.status(200).json({ product });
        })
})


// Delete employee
app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    productData.findByIdAndRemove(id)
        .then(() => {
            res.status(200).json({ id });
        })
        .catch((err) => {
            console.log('Error is: ', err)
        })
})

// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorized request')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if (token === 'null') {
//         return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token, 'secretkey')
//     if (!payload) {
//         return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
// }

app.post('/insert', (req, res) => {
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
    var product = new productData(product);
    product.save();
});


app.get('/edit/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    productData.findOne({ _id: id })
        .then(function(product) {
            res.send(product);
        })
        .catch((err) => {
            console.log('Error is: ', err)
        })
});

app.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

// app.post('/edit', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
//     console.log(req.body);
//     let pid = req.body.pid;
//     var product = {
//         productId: req.body.product.productId,
//         productName: req.body.product.productName,
//         productCode: req.body.product.productCode,
//         releaseDate: req.body.product.releaseDate,
//         description: req.body.product.description,
//         price: req.body.product.price,
//         starRating: req.body.product.starRating,
//         imageUrl: req.body.product.imageUrl
//     }
//     productData.findByIdAndUpdate(pid, product)
//         .then(() => {
//             console.log('Updated successfully')
//         })
//         .catch((err) => {
//             console.log("Error is: ", err)
//         })
// });

app.post('/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("reqbody" + req.body);
    var product = {
        _id: req.body.product._id,
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    productData.findOne({ _id: product._id })
        .then(function(productret) {
            if (!productret) {
                return next(new Error('Could not load Document'));
            } else {
                var productupdate = new productData(product);
                console.log("findOne" + productret)
                    // productupdate.save();
                console.log("findOne update" + productupdate)
                productData.findByIdAndUpdate(productupdate._id, productupdate, (er, updated) => {
                    console.log("updated" + updated);
                });
            }
        });
});