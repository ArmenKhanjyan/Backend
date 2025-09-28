import express from "express";
import cors from "cors";
import { addUser, getUserByLogin } from "./lib/db.js";
import bcrypt from 'bcrypt'

const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

    app.post("/auth/sign",async(req,res) => {
          const  {login,password} = req.body
          if(!login || !password) {
            return res.status(400).send({message:"please fill all the fields"})
          }

          const found =  await getUserByLogin(  login)
          if(!found) {
            return res.status(400).send({message:"please fill all the fields"})
          } 
          const pas = await bcrypt.compare(password,found.password)
          if(!pas) {
            return res.status(400).send({message:"please fill all the fields"})
          }
          return res.status(200).send({message:" success"})
    })

app.post("/auth/signup",async (req, res) => {
   
    const user = req.body
   
    if( !req.body.name || !req.body.surname || !req.body.login || !req.body.password) {
        res.status(400).send({message:"please fill all the fields"})
    }
    const found = await  getUserByLogin(user.login);
    if(found) {
        return res.status(400).send({message:"login is busy"})
    }
   
    user.password = await bcrypt.hash(user.password,10)
    await addUser(req.body)  
    res.status(200).send({ message: "success" });

});



app.listen(4002, () => console.log("http://localhost:4002"));