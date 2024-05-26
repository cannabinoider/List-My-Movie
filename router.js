const express=require('express')
const route=express.Router()
const control=require("./controller")

route.get("/",control.getHome)
route.post("/signup",control.signup)
route.get("/login",control.login)


module.exports = route;