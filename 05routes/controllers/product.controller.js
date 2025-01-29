const {Product} = require('../models/index');



const getProducts = async (req, res)=> {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const getSingleProduct = async(req,res) =>{
    // Find a single document in the 'cpu' collection using the provided ID
    Product.findOne({ _id: req.params.id })
        .then((singleCPU) =>
            // Conditional (ternary) operator to check if the result (singleCPU) is falsy (null or undefined)
            !singleCPU
                // If singleCPU is falsy (not found), send a 404 response with an error message
                ? res.status(404).json({ message: 'Error: Product ID not found' })
                // If singleCPU is truthy (found), send the document as a JSON response
                : res.json(singleCPU)
        )
        // Catch any errors that occur during the query and send a 500 response
        .catch((err) => res.status(500).json(err));
}

const createProduct = async (req,res) => {
    try {
        // async post to db through server
        const product = await Product.create(req.body);
        // success respons message with what was posted
        res.status(200).json(product);
    } catch (err) {
        //err message with err code
        res.status(500).json({ message: err.message })
    }
}

const updateProduct = async (req,res)=>{
    Product.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {
            new: true,
            ranValidators: true
        }
    )
        .then((dbProductData) => {
            if(!dbProductData) {
                return res.status(404).json({ message: 'No product with that ID'})
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

const deleteProduct = async (req, res) => {
    try {
        // Attempt to find and delete the product
        const deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
        
        // If no product is found, return a 404 error
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Error: No product found with that ID' });
        }

        // If successful, return a success message
        res.json({ message: 'Success! Product deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'An error occurred while deleting the product', error: err.message });
    }
};


module.exports = {
    getProducts, 
    getSingleProduct, 
    createProduct,
    updateProduct,
    deleteProduct
}