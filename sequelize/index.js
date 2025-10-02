const dotenv = require("dotenv")
dotenv.config()
const express = require('express')

const app = express()
const routerLogin = require("./router/login.js")
const routerUser = require("./router/user.js")

const routerSignup = require("./router/signup.js")
const db = require("./models")

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const docs = YAML.load("./docs/api.yaml");



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

app.use("/auth/signup",routerSignup)
app.use("/auth/login",routerLogin)
app.use("/auth/user",routerUser)

db.sequelize.sync({alter:true}).then(() => {
  console.log("DB");
})

app.listen(4002,() => console.log("http://localhost:4002"))