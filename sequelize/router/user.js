const express = require("express")
const router = express.Router()
const{User} = require("../models")
const  authMiddleware  = require("./middleWare/auth.js")


router.get("/",authMiddleware,async(req,res) => {
    const user = await User.findByPk(req.user.id)
    res.status(200).send({user})    
}) 
module.exports = router