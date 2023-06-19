const Product = require('../models/product');

const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        // validation of  data
        if (!name) {
            return res.status(400).json({ message: 'name are required fields.' });
        }
        if (!price) {
            return res.status(400).json({ message: 'price are required fields.' });
        }
        if (!quantity) {
            return res.status(400).json({ message: 'quantity are required fields.' });
        }

        // Making product
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            category: category
        })

        // save to DB
        await newProduct.save()
            .then(() => {
                // Sucessfull
                res.status(201).json({ message: 'Product created successfully', product: newProduct });
            })
            .catch((error) => {
                // error in saving product to DB
                console.error('Error in CreateProduct:', error);
                res.status(500).json({ message: 'Failed to create product', error: error.message });
            });


    } catch (error) {
        console.error('Error in adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSpecificProduct = async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const productID = req.params.id;

        // Use the product ID to find the product in DB
        const product = await Product.findById(productID);

        // Check if the product is found
        if (product) {
            // Return a success response with the product details
            res.status(200).json({ message: 'Product found', product });
        } else {
            // Return an error response indicating that the product was not found
            res.status(404).json({ message: 'Product not found' });
        }

    } catch (error) {
        console.error('Error in getting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        // getting new information from body
        const { name, description, price, quantity, category } = req.body;

        // Product ID -> from parameters
        const productID = req.params.id;

        const updateProductDetail = await Product.findByIdAndUpdate(
            productID,
            { name, description, price, quantity, category },
            { new: true }
        )

        if (!updateProductDetail) {
            return res.status(404).json({ message: 'Product not updated' });
        }

        res.json({ message: 'Product details updated successfully', product: updateProductDetail });

    } catch (error) {
        console.error('Error in updating product details');
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        // Product ID -> from parameters
        const productID = req.params.id;

        const deleteProduct = await Product.findByIdAndRemove(
            productID
        );

        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not deleted' })
        }

        res.json({ message: 'Product deleted successfully', product: deleteProduct });

    } catch (error) {
        console.error('Error in deleting product');
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();

        // Return the products in the response
        res.json(products);

    } catch (erro) {
        console.error('Error in getting product');
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    createNewProduct,
    getSpecificProduct,
    UpdateProduct,
    deleteProduct,
    getAllProducts
}