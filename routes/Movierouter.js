const express=require('express')
const route=express.Router()
const control=require("../controllers/MovieController")

route.get("/",control.getHome)
route.post("/signup",control.signup)
route.get("/login",control.login)
route.post("/addToWatchlist",control.addToWatchlist)


module.exports = route;