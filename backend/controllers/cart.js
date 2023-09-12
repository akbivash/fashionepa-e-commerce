const Cart = require("../models/Cart")



// CREATE CART 
const createCart = async (req, res) => {
    const newCart = new Cart(req.body)
    try{
        const saved = await newCart.save()
        res.status(200).json(saved)
    }catch(err){
        res.json({msg:"error creating Cart"})
        return
    }
}

// UPDATE CART 
const updateCart = async (req, res) => {

    try{
        const updatedCart = await Cart.findOneAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})
        res.json(updatedCart)
    }catch(err){
        res.status(500).json({msg:"error updating Cart"})
        return
    }
}

// GET USER CART 
const getCart = async(req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId})
        if(!cart){
            res.json({msg:"Cart not found"})
            return
        }
        res.status(200).json(cart)
    }catch(err){
        res.json({msg:"can not get Cart"})
        return
    }
    }
    

// DELETE CART 
const deleteCart = async (req, res) => {

    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.json({msg: "Cart has been deleted"})
    }catch(err){
        res.json({msg:"Cart can not be deleted"})
        return
    }
}


// GET ALL CARTS 
const getCarts = async(req, res) => {
    try{
const carts = await Cart.find()
res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = {getCarts, createCart, updateCart, deleteCart, getCart}