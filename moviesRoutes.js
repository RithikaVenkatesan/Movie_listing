const express = require("express");
const router =express.Router();
const Movie=require("../../db/schemas/movieSchema")


router.post("/",async(req,res)=>{//create
    try {
    const moviesData =req.body;// all payload from req in body
    const newMovie=new Movie(moviesData);//Movie is model,to send to schema
    await newMovie.save();// save req
    res.json({ 
        message:"movie added successfully" 
});
    
    } catch(error){
    console.log(error);
    res.status(500).json({ 
        message:"movie already existed"
    });
} 
});

router.put("/:id",async(req,res)=>{ //update
    try{
        const movieId=req.params.id;//for unique use id
        await Movie.findByIdAndUpdate(movieId,updatedMovieData);//parameters
        res.json({
            message:"Movie updated successfully",  
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.delete("/:id", async(req, res) => { 
    try {
        const movieId = req.params.id;// id in path parameters
        const deletedMovieData=req.body;
        await Movie.findByIdAndDelete(movieId,deletedMovieData);
        res.json({
            message: "Movie deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});


router.get("/", async (req, res) => {
    const queryparams=req.query;
    const filters={};
    if(queryparams.name){
        filters.name={
            $regrex: `^${queryparams.name}`,
            $options:"i",
        
        };
    }
    if(queryparams.rating) {
        filters.rating={
            $gte: parseFloat (queryparams.rating),
        };
    }
    
        const movies = await Movie.find();
        res.json(movies);
});



module.exports=router;


