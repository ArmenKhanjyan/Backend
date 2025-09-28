const express = require("express")
const app = express()
const productRoutes = require("./routes/productRoutes")
const ProductModel = require("./models/productModel")
const productModel = new ProductModel(); 

app.set("view engine","ejs")
app.set("views","views") 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/product",productRoutes)
app.use("/products",productRoutes)
app.use("/pr",productRoutes)

app.get("/",(req,res) => {
    res.render("home")
})
app.get("/add",(req,res) => {
    res.render("add")
})
app.get("/post/:id",(req,res) => {
     const id = Number(req.params.id)
     const product = productModel.getProduct(id) 
     if(!product) {
        return res.status(404).send("Not a product")
     }
     res.render("productPage",{product})
})



app.listen(4002,() =>console.log("http://localhost:4002"))