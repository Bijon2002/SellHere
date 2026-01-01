const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');



//create order api - /api/v1/order
exports.createOrder=async(req,res,next)=>{


    const CartItems = req.body.CartItems;
    const amount = CartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0);
    // console.log(amount, 'AMOUNT');

    const status = "pending";
    const createdAt = Date.now();

    const order = await orderModel.create({
        CartItems,
        amount,
        status,
        createdAt
        //createdAt:Date.now()
    });

    //updating product stock
 // updating product stock
CartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id);
    product.stock = product.stock - item.qty;
    await product.save();
});







    res.json({
        success:true,
        order
    });
}