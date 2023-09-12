const Product = require("../models/Product");

// create product 
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saved = await newProduct.save();
    res.status(200).json(saved);
  } catch (err) {
    res.json({ msg: "error creating product" });
    return;
  }
};

// UPDATE PRODUCT 
const updateProduct = async (req, res) => {
  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {

    res.status(500).json({ msg: "error updating product", err });
    return;
  }
};


// GET PRODUCT 
const getProduct = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.json({ msg: "product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.json({ msg: "can not get product" });
    return;
  }
};

// DELETE PRODUCT 
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product has been deleted" });
  } catch (err) {
    res.json({ msg: "Product can not be deleted" });
    return;
  }
};

// GET PRODUCTS 
const getProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  const queryName = req.query.name
  const querySearch = req.query.search
  const page = req.query.page
  const limit = req.query.limit
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });

    }else if (querySearch) {
      const regexPattern = new RegExp(querySearch, 'i');
      products = await Product.find({
        $or: [
          { title: regexPattern },
          { categories: regexPattern },
        ],
     
      });
    } else if (page && limit) {
      products = await Product.find();
      products = products.slice(startIndex, endIndex);

    } 
    else {
      products = await Product.find();
    }
    res.json(products);

  } catch (err) {
    res.status(400).send(err);
    return;
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
