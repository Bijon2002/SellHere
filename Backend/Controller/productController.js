const productModel = require('../models/productModel');


exports.getProducts= async (req,res,next)=>{

   const products = await productModel.find({});



    res.status(200).json({
        success:true,
        products
    });
}

exports.getSingleProducts=(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"get single product is working fine"
    });
}