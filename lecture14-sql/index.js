import express from 'express'
import UsersModel from"./models/users.js"
const app = express()

app.get("/users",async(req,res) => {
   const users =  await UsersModel 
             .select("name")
             .where("age",">",22)
             .andWhere("salary",">",2000)
             .limit(2)
             .get();
        res.json(users)     

})

app.listen(4002,() => console.log("http://localhost:4002"))