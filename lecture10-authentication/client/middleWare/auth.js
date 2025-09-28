import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getUser } from '../../lib/db.js'
dotenv.config()

export const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization  
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(404).send({message: "does not match tokenel"})
    }
    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.SECRET_KEY,async(err,data) => {
        if(err) {
            return res.status(303).send({message:"call again"})
        } 
        req.user = await getUser(user => user.id === data.id) 
        next()
    })

} 