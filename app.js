require("dotenv").config(); // configure the express here
const ConnectDB =require("./db/index.js");
const movies = require("./routes/movies/moviesRoutes");
const express = require("express");
const app =new express();
const port=process.env.PORT || 8080;// it takes value if given or take 8080
ConnectDB();
app.use(express.json());// response 
app.use("/movies",movies);


app.listen(port,()=>{  
    console.log(`express app listening at https://localhost:${port}`);
});  