const Product = require('./product.model');

exports.create = (req, res) => {
    // Request Validation
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        title: req.body.title || "No Product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save Product in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the product."
            });
        });
};

// Retrieve all products from the database
exports.findAll = (req, res) => {
    console.log("findAll")
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: err.message || "Something wrong while creating the product."
            });
        })
};

// Find a single product with a productId 
exports.findOne = (req, res) => {
    Product.findById(req.param.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }

        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.productId
        });
    })
};


