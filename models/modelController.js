const Profile = require('../schemas/profile');

module.exports.getUserName=async (userName)=>{
    const Dbdata=await Profile.findOne({userName:userName});
    if(Dbdata){
        return(Dbdata);
    }
    else{
        return("go ahead");
    }
}

module.exports.addUserName = async (userName, email, password) => {
    try {
        const userLogin = new Profile({ 
            userName, 
            name: "Default Name", // Change this to a default value or make sure to pass a name
            email, 
            password, 
            image: "", 
            movies: []
        });
        await userLogin.save();
        return "Details Entered";
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return "Error entering data";
    }
};

module.exports.getEmail=async (email)=>{
    const Dbdata=await Profile.findOne({email:email});
    if(Dbdata){
        return(Dbdata);
    }
    else{
        return("go ahead");
    }
}

module.exports.getWatchlist=async (userName)=>{
    const movieWatchlist=await Profile.findOne({userName:userName});
    if(movieWatchlist){
        console.log(movieWatchlist);
        return(movieWatchlist);
    }
    else{
        return("go ahead");
    }
}
module.exports.addMovieIdToWatchList=async (userName,movieId,movies)=>{
    const movieWatchlist=await Profile.updateOne({userName:userName},{ $set: { movies: [...movies, { id: movieId }] } });
    if(movieWatchlist.modifiedCount===1){
        return "updated Successfully";
    }
    else{
        return("db error");
    }
}