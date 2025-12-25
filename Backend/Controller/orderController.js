const orderModel = require('../models/orderModel');


//create order api - /api/v1/order
exports.createOrder=async(req,res,next)=>{


  const CartItems=req.body;
  const amount=CartItems.reduce((acc,item)=>(acc+item.product.price * item.qty),0);
 // console.log(amount, 'AMOUNT');

 const status="pending";
 const createdAt=Date.now();

 const order=await orderModel.create({
    CartItems,
    amount,
    status,
    createdAt
    //createdAt:Date.now()
 });







    res.json({
        success:true,
        order
    });
}