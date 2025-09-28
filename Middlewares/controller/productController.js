const productModel = require("../models/productModel")
class productController {
    model = new productModel()
    foo(req,res){
        const found = this.model.getAll();
        if (!found) {
            return res.status(404).send({ error: "not a product in found" });
        }
         res.send({ product: found});
    }
    add(product,res) {
        this.model.addProduct(product)
        res.send({success:true,message:"product addedet"})
    
    }
    addComment(id,comment,res) {
        this.model.addComment(id,comment)
        res.send({success:true,message:"comment added"})
        
    }
}
module.exports = new productController();

