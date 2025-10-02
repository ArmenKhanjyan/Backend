const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {User} = require('../models')


router.post("/",async(req,res) => {
    console.log(req.body)
    if(!req.body.name || !req.body.surname || !req.body.login || !req.body.password ) {
        return res.status(400).send({message:"Mising Fields"})
    }
    const {name,surname,login,password} = req.body
    
     const uniqLogin = await User.findOne({where:{login}})
    if(uniqLogin) {
        return res.status(400).send({message:"login is busy"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({name,surname,login,password:hashPassword})
    res.status(201).send({message:"User created successfully"})
  
})

module.exports = router