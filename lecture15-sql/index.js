import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const router = express.Router()
app.use("/auth/signup",router)



app.listen(4002,() => console.log("http://localhost:4002"))