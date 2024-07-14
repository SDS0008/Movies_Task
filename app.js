const express = require("express");

const {open} = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path");

const app = express();

const dbPath = path.join(__dirname,"tables.db");

app.use(express.json());

let db = null;

const initilaizeDbAndServer = async()=> {

    try {
        db = await open({
          filename: dbPath,
          driver: sqlite3.Database,
        });
        const port = 8000;
        app.listen(port, () => {
          console.log(`DB Connected\nServer Running at ${port}`);
        });
      } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
      }

};

initilaizeDbAndServer();

//table names are movies and Directors
//Add moives to Database Table...
app.post("/movies/", async(req,res) => {
try {
    const {director_id,movie_name,lead_actor} = req.body;

 const addMovieQuery = `INSERT INTO movies(
  director_id,
  movie_name,
  lead_actor ) VALUES (${director_id},'${movie_name}','${lead_actor}');`;

        const Movies = await db.run(addMovieQuery);

        res.status(201).json({
            message :` Movie added to the Movies Table :` , Movies : Movies
        });


} catch (error) {
    console.log("movies" , error.message);
    res.status(500).send("Internal Server Error");
}
});


//Get All Movies from Table...
app.get("/movies", async(req,res) => {
    try {
     
        const fetchQuery = `SELECT * FROM  movies;`;

        const Movies  = await db.all(fetchQuery);

    
            res.status(200).json({
                message :` Fetched All Players from cricketTeam Table`, Movies : Movies
            });
    
    
    } catch (error) {
        console.log("movies" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    

//Get a Single movie from Table...
app.get("/movies/:moviesId", async(req,res) => {
    try {
     
        const {moviesId} = req.params;

        const fetchQuery = `SELECT *  from movies WHERE movie_id=${moviesId};`;

        const singleMovie  = await db.all(fetchQuery);

    
            res.status(200).json({
                message :` Fetched  moviesId : ${moviesId} from movies Table`, singleMovie : singleMovie
            });
    
    
    } catch (error) {
        console.log("movies" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    

//Update movie And Add to Database Table...
app.put("/movies/:moviesId", async(req,res) => {
    try {
        const {moviesId} = req.params;
        const {director_id,movie_name,lead_actor} = req.body;
    
     const updateMovieQuery =  `UPDATE movies SET director_id = ${director_id}, movie_name = '${movie_name}',lead_actor = '${lead_actor}' WHERE movie_id = ${moviesId}`;
     
    
            const movies = await db.run(updateMovieQuery);
    
            res.status(200).json({
                message :` movie updated Successfully with movie_id : ${moviesId}`
            });
    
    
    } catch (error) {
        console.log("movies" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });

    

//Delete movie from Database Table...
app.delete("/movies/:moviesId", async(req,res) => {
    try {
        const {moviesId} = req.params;
       
    
     const deleteMovieQuery =  `DELETE FROM movies WHERE movie_id = ${moviesId}`;
     
    
            const Movies = await db.run(deleteMovieQuery);
    
            res.status(201).json({
                message :` movie deleted Successfully with movieId : ${moviesId}`
            });
    
    
    } catch (error) {
        console.log("movies" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    


    //get all Directors
app.get("/directors/", async(req,res) => {
    try {
     
        const fetchQuery = `SELECT * FROM  directors;`;

        const directors  = await db.all(fetchQuery);

    
            res.status(200).json({
                message :` Fetched All Players from cricketTeam Table`, directors : directors
            });
    
    
    } catch (error) {
        console.log("directors" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });



    //get names of movies by specific director (natural joins)

    app.get("/directors/:directorId/", async(req,res) => {
        try {
         
            const {directorId} = req.params;
    
            const fetchQuery = `SELECT director_id, directors.director_name, movie_name, lead_actor 
            FROM
             movies NATURAL join directors
              WHERE director_id = ${directorId};`;
    
            const singleDirector  = await db.all(fetchQuery);
    
        
                res.status(200).json({
                    message :` Fetched  directorId : ${directorId} from directors Table`, singleDirector : singleDirector
                });
        
        
        } catch (error) {
            console.log("directors" , error.message);
            res.status(500).send("Internal Server Error");
        }
        });