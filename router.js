const express=require('express')
const route=express.Router()
const control=require("./controller")

route.get("/",control.getHome)
route.get("/signup",control.signup)


module.exports = route;