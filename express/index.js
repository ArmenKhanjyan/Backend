const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const fs = require("fs")
const path = require("path")

app.set("view engine","pug")
app.set("views","pages")


app.get("/",(req,res) => {
    res.render("home")
})

app.get("/user",(req,res) => {
    const users = foo()
    res.render("list",{users})
})

app.get("/add",(req,res) => {
    res.render("add")
})

const userFile = path.join(__dirname,"lib","data.json");
function foo() {
   const data = fs.readFileSync(userFile,"utf-8")
   return data && data.trim() ? JSON.parse(data) : [] 
}


app.post("/add",(req,res) => {
    const user = foo()
    user.push(req.body);
    fs.writeFileSync(userFile,JSON.stringify(user,null,2))
    res.redirect("/user")
})


app.listen(4002,() => console.log("http://localhost:4002"))
