// src/utils/errorHandler.js
const errorHandler = (error) => {
    console.error(error);
    return {
      message: error.message,
      status: error.status || 500,
    };
  };
  
  module.exports = errorHandler;
  