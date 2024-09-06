const express=require('express')
const route=express.Router()
const control=require("../controllers/MovieController")

route.get("/",control.getHome)
route.post("/signup",control.signup)
route.get("/login",control.login)
route.post("/addToWatchlist",control.addToWatchlist)
route.get("/getMoviesFromWatchlist",control.getMovies)
route.post("/deleteMovieFromWatchlist",control.deleteMovies)
route.get("/getUserdetails",control.getUserDetails)

module.exports = route;