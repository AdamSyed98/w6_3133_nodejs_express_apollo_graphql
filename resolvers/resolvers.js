import MovieModel from '../models/movie.js';

// Define resolvers
const movieResolvers = {

  Query: {

    // ✅ Get all movies
    getAllMovies: async () => {

      try {

        return await MovieModel.find();

      } catch (error) {

        throw new Error("Error fetching movies");

      }

    },


    // ✅ Get movie by ID
    getMovieById: async (_, { id }) => {

      try {

        const movie = await MovieModel.findById(id);

        if (!movie) {

          throw new Error("Movie not found");

        }

        return movie;

      } catch (error) {

        throw new Error(error.message);

      }

    },


    // ✅ Get movies by director (STATIC METHOD FIXED)
    getMoviesByDirector: async (_, { director_name }) => {

      try {

        return await MovieModel.findByDirector(director_name);

      } catch (error) {

        throw new Error("Error fetching movies by director");

      }

    },

  },


  Mutation: {


    // ✅ Insert new movie
    addMovie: async (_, { input }) => {

      try {

        const newMovie = new MovieModel(input);

        return await newMovie.save();

      } catch (error) {

        throw new Error("Error adding movie");

      }

    },


    // ✅ Update movie
    updateMovie: async (_, { id, input }) => {

      try {

        const updatedMovie = await MovieModel.findByIdAndUpdate(

          id,

          input,

          { new: true }

        );

        if (!updatedMovie) {

          throw new Error("Movie not found");

        }

        return updatedMovie;

      } catch (error) {

        throw new Error(error.message);

      }

    },


    // ✅ Delete movie by ID
    deleteMovie: async (_, { id }) => {

      try {

        const deletedMovie = await MovieModel.findByIdAndDelete(id);

        if (!deletedMovie) {

          throw new Error("Movie not found");

        }

        return true;

      } catch (error) {

        throw new Error(error.message);

      }

    },

  }

};


// ✅ Required export
export default movieResolvers;