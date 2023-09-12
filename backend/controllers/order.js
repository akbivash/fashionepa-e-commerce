const Order = require("../models/Order")



// CREATE Order 
const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try{
        const saved = await newOrder.save()
        res.status(200).json(saved)
    }catch(err){
        res.json({msg:"error creating Order"})
        return
    }
}

// UPDATE Order 
const updateOrder = async (req, res) => {

    try{
        const updatedOrder = await Order.findOneAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})
        res.json(updatedOrder)
    }catch(err){
        res.status(500).json({msg:"error updating Order"})
        return
    }
}

// GET USER Order 
const getOrder = async(req, res) => {
    try{
        const order = await Order.find({userId: req.params.userId})
        if(!order){
            res.json({msg:"Order not found"})
            return
        }
        res.status(200).json(order)
    }catch(err){
        res.json({msg:"can not get Order"})
        return
    }
    }
    

// DELETE Order 
const deleteOrder = async (req, res) => {

    try{
        await Order.findByIdAndDelete(req.params.id)
        res.json({msg: "Order has been deleted"})
    }catch(err){
        res.json({msg:"Order can not be deleted"})
        return
    }
}


// GET ALL OrderS 
const getOrders = async(req, res) => {
    try{
const orders = await Order.find()
res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
}

// GET Monthy income 
const getMonthlyIncome = async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))

    try{
const income = await Order.aggregate([
    {$match: {createdAt: {$gte: prevMonth}}},
    {
         $project: {
        month: { $month: "$createdAt"},
    sales: "$amount"
    }}, {
        $group: {
            _id: "$month",
            total:{$sum: "$sales"}
        }
    }
])
res.json(income)
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = {getOrders, createOrder, updateOrder, deleteOrder, getOrder,getMonthlyIncome}