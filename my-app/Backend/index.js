const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// MongoDB Connection

mongoose.connect('mongodb+srv://shuklafruit:9868995689@cluster0.vujwsvk.mongodb.net/movies?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

// Define Schema
const movieSchema = new mongoose.Schema({
  moviename: String,
  image: String,
  link: String
});

const Movie = mongoose.model('Movie', movieSchema);


app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/movies', async (req, res) => {
    const { moviename, image, link } = req.body;
  
    try {
      const newMovie = new Movie({ moviename, image, link });
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});