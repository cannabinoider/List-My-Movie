const { getUserName, addUserName,getEmail,getWatchlist,addMovieIdToWatchList} = require('../models/modelController')
const jwt =require("jsonwebtoken")
const dotenv=require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config()

module.exports.addUser = async (userName, email, password) => {
    try {
        const existingUser = await getUserName(userName);
        if (existingUser === "go ahead") {
            try {
                const returnedData = await addUserName(userName, email, password);
                console.log(returnedData);
                if (returnedData === "Details Entered") {
                    return ("Details Entered Successfully");
                }
                else {
                    return ("db error");
                }
            }
            catch (err) {
                console.error(err);
                return ("db data entering error");
            }
        }
        else{
            return("Username already taken");
        }
    } catch (err) {
        console.error(err);
        return("error accessing db");
    }
};

module.exports.checkUserName=async(userName,password)=>{
    try{
        const existingUser = await getUserName(userName);
        if(existingUser==="go ahead"){
            try{
                const userNameLower=userName.toLowerCase();
                const existingEmail = await getEmail(userNameLower);
                if(existingEmail==="go ahead"){
                    return("UserName not found");
                }
                else{
                    const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
                    if(isPasswordCorrect){
                        const token=jwt.sign(
                            {
                                userName:userName,
                                password:password
                            },
                            process.env.SECRET_KEY,
                            {expiresIn:"2h"}
                        );
                        return(token);
                    }
                    else{
                        return("Incorrect Password");
                    }
                }
            }
            catch(err){
                console.log(err);
                return("error accessing db");
            }
        }
        else{
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(isPasswordCorrect){
                const token=jwt.sign(
                    {
                        userName:userName,
                        password:password
                    },
                    process.env.SECRET_KEY,
                );
                return(token);
            }
            else{
                return("Incorrect Password");
            }
        }
    }
    catch(err){
        console.log(err);
        return("error accessing db");
    }
}
module.exports.addMovieToWatchlist = async (userName, movieId) => {
    try {
        const existingMovies = await getWatchlist(userName);
        if(existingMovies.movies.includes(movieId)){
            return("Movie is already present in Watchlist")
        }
        else{
            const addMovie=await addMovieIdToWatchList(userName,movieId,existingMovies.movies);
            return addMovie;
        }
    } catch (err) {
        console.error(err);
        return("error accessing db");
    }
};
module.exports.getMoviesFromWatchlist = async (userName) => {
    try{
        const userList = await getWatchlist(userName);
        if(userList && userList.length>0){
            const movieIds = userList.movies.map(movie => movie.id);
            return movieIds;
        }else{
            return null;
        }
    }
    catch(err){
        console.error(err);
        return("error accessing db")
    }
};
module.exports.deleteMovieFromWatchlist = async (userName, movieId) => {
    try {
        const existingMovies = await getWatchlist(userName);
        if (!existingMovies || existingMovies.movies.length === 0) {
            return "Movies not found in watchlist";
        }
        const updatedMovies = existingMovies.movies.filter(movie => !movieId.includes(movie.Id));

        if (updatedMovies.length === existingMovies.movies.length) {
            return "Movies not found in watchlist";
        }
        const result = await updateWatchlistMovies(userName, updatedMovies);
        
        if (result.modifiedCount === 1) {
            return "Movies removed successfully";
        } else {
            return "db error";
        }
    } catch (err) {
        console.error(err);
        throw new Error("Error accessing database");
    }
};
