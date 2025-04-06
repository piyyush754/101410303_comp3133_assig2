// src/typeDefs/index.js
const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const fs = require('fs');
const path = require('path');

// Read .graphql files from the typeDefs folder
const userTypeDefs = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8');
const employeeTypeDefs = fs.readFileSync(path.join(__dirname, 'employee.graphql'), 'utf8');

// Create a base Query type if not defined already
const baseTypeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = mergeTypeDefs([baseTypeDefs, userTypeDefs, employeeTypeDefs]);
