import express from 'express'
import { addUser, getUserByLogin } from './lib/db.js';
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'
import { authMiddleware } from './client/middleWare/auth.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
dotenv.config()

app.post("/auth/signup",async(req,res) => {
    const user = req.body;
    const found = await getUserByLogin(user.login)
    if(found) {
        return res.status(401).send({message:"try a new login"})
    }
     user.password = await bcrypt.hash(user.password,10)
    await addUser(user)
    res.status(201).send({message:"success"})
})

app.post("/auth/login",async(req,res) => {
    const {login,password} = req.body
    if(!login || !password) {
        return res.status(401).send( {message:"please fill all the fields"})
    }
    const found = await getUserByLogin(login);
    if(!found) {
        return res.status(400).send({message:"wrong user credentials"})
    } 
    const isCorrect = await bcrypt.compare(password, found.password)
     if (!isCorrect) {
        
       return res.status(400).send({message:"wrong user credentials"}) 
    }
    const token = jwt.sign({id:found.id},process.env.SECRET_KEY,{expiresIn:'4h'})
    return res.status(200).send({token})
})

app.get("/auth/user",authMiddleware,async(req,res) =>{
     res.status(200).send({message:"success"}) 
})
app.listen(4002,() => console.log("http://localhost:4002"))