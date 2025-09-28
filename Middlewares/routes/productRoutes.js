const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")


router.get("/foo",productController.foo.bind(productController))
  
router.post("/com",(req,res) => {
     const {id,comment} = req.body
     productController.addComment(id,comment,res)

 })
router.post("/foo",(req,res) => {
      const {model,price} = req.body
      const id = Date.now()
      productController.add({model,price,id},res)
})

module.exports = router