module.exports = (app) => {
    const products = require('./product.controller');

    // create a new product
    app.post('/products', products.create);

    // Retrieve all Products
    app.get('/products', products.findAll);
}