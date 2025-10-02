const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const {User} = require('../models')

router.post("/",async(req,res) => {
    const {login,password} = req.body;
    if(!login || !password) {
        return res.status(400).send({message:"wrong user credentials"})
    }
    const found = await User.findOne({where:{login}})
    if(!found) {
        return res.status(404).send({message:"User not found"})
    }
   
    const isCorrect = await bcrypt.compare(password,found.password)
    if(!isCorrect) {
        return res.status(400).send({message:"wrong user credentials"})
    }
    const token = jwt.sign({id:found.id},process.env.SECRET_TOKEN,{expiresIn:"10h"})
    res.status(201).send({token})
    
})

module.exports = router