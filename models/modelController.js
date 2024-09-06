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
        console.error(error); 
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

module.exports.getWatchlist = async (userName) => {
    const movieWatchlist = await Profile.find({ userName: userName });
    if (movieWatchlist && movieWatchlist.length > 0) {
        console.log(movieWatchlist[0]);  
        return movieWatchlist;  
    } else {
        return null;  
    }
};

module.exports.addMovieIdToWatchList=async (userName,movieId,movies)=>{
    const movieWatchlist = await Profile.updateOne({userName:userName},{ $set: { movies: [...movies, { id: movieId }] } });
    if(movieWatchlist.modifiedCount===1){
        return "updated Successfully";
    }
    else{
        return("db error");
    }
}
module.exports.updateWatchlistMovies = async (userName, updatedMovies) => {
    try {
        const result = await Profile.updateOne(
            { userName },
            { $set: { movies: updatedMovies } }
        );
        return result;  
    } catch (err) {
        console.error(err);
        throw new Error('Database update error');
    }
};
module.exports.getUserDetails = async (userName) => {
    try {
        const user = await Profile.findOne({ userName }, 'userName email');  
        return user;
    } catch (err) {
        console.error("Error fetching user details", err);
        throw new Error("Database query error");
    }
};
