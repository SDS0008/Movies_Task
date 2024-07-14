CREATE TABLE movies (movie_id INTEGER PRIMARY KEY AUTOINCREMENT,director_id INTEGER,movie_name TEXT,lead_actor TEXT);

SELECT *  from movies WHERE movie_id=1;

SELECT *  from movies;

INSERT INTO movies(
  director_id,
  movie_name,
  lead_actor 
) 
VALUES
 (1,"RRR","N.T.R $ RAM CHARAN"),
  (1,"Baahubali","Prabhas"),
   (1,"Baahubali 2","Prabhas"),
   (2,"R.O.B.O.T","Rajini Kanth"),
    (2,"2.0","Rajini Kanth"),
     (3,"K.G.F:Chapter 1","Yash Gowda"),
     (3,"K.G.F:Chapter 2","Yash Gowda");



INSERT INTO movies(
  director_id,
  movie_name,
  lead_actor 
) 
VALUES
 (8,"deleted","N.T.R & RAM CHARAN");
 


     CREATE TABLE directors (director_id INTEGER,director_name TEXT);

     
INSERT INTO directors(
  director_id,
  director_name
) 
VALUES
 (1,"S. S. Rajamouli"),
   (2,"S. Shankar"),
     (3,"Prashanth Neel");

     SELECT *  FROM directors;

     SELECT director_id ,directors.director_name ,movie_name ,lead_actor from movies NATURAL join directors WHERE director_id = 3;