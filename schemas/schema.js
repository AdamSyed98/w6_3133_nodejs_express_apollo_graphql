// schemas/schema.js
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  input MovieInput {
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  input MovieUpdateInput {
    name: String
    director_name: String
    production_house: String
    release_date: String
    rating: Float
  }

  type Query {
    # ✅ Get all movies
    getAllMovies: [Movie!]!

    # ✅ Get movie by ID
    getMovieById(id: ID!): Movie

    # ✅ Get movies by director name (must use static method)
    getMoviesByDirector(director_name: String!): [Movie!]!
  }

  type Mutation {
    # ✅ Insert new movie
    addMovie(input: MovieInput!): Movie!

    # ✅ Update movie
    updateMovie(id: ID!, input: MovieUpdateInput!): Movie!

    # ✅ Delete movie by ID
    deleteMovie(id: ID!): Boolean!
  }
`;

export default typeDefs;