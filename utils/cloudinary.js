const cloudinary = require('cloudinary').v2;
require('dotenv').config()





cloudinary.config({ 
    cloud_name: "dzwqw1te1", 
    api_key: "731896723397462", 
    api_secret: "Z0ZApejew3RRolwH3uXSRErRUsE" 
  });

  module.exports= cloudinary;