// src/resolvers/index.js
const userResolver = require('./userResolver');
const employeeResolver = require('./employeeResolver');

module.exports = [userResolver, employeeResolver];
