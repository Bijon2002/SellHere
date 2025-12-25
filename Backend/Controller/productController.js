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
exports.getSingleProducts=async(req,res,next)=>{

    try{

  const product = await productModel.findById(req.params.id);

    res.status(200).json({
        success:true,
        product
    });
}
    catch(error){
        res.status(404).json({
            success:false,  
            message:error.message
        });
    }
}