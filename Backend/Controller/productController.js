const productModel = require('../models/productModel');

//get products api - /api/v1/products
exports.getProducts= async (req,res,next)=>{

   const products = await productModel.find({});



    res.status(200).json({
        success:true,
        products
    });
}
//get single product api - /api/v1/products/:id
exports.getSingleProducts=(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"get single product is working fine"
    });
}