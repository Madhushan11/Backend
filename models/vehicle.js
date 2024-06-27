const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    title: 
    {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    image: {
      public_id: {
          type: String,
          required: true
      },
      url: {
          type: String,
          required: true
      }
  },

    /*user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User"},*/  
  });

  const Vehicle = mongoose.model('vehicle', vehicleSchema);

  module.exports = Vehicle;