const Vehicle = require('../models/vehicle');
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary');

const fetchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({ vehicles });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const fetchVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);
      const image = vehicle.image;
    

    res.json({ vehicle,image });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const createVehicle = async (req, res, next) => {
  console.log(req.body)

    const { title, body, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "vehicles",
      // width: 300,
      // crop: "scale"
  })  
    const vehicle = await Vehicle.create({
      title,
      body,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
    });
    res.status(201).json({
      success: true,
      vehicle
  })
      
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { title, body } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedData = {
      title,
      body,
      image
    };
    
    if (image) {
      updatedData.image = image;
    }

    await Vehicle.findByIdAndUpdate(vehicleId, updatedData);

    const vehicle = await Vehicle.findById(vehicleId);
    res.json({ vehicle });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

// const deleteVehicle = async (req, res) => {
//   try {
//     console.log("deleting")
//     const vehicleId = req.params.id;
//     // const deletedVehicle = await Vehicle.deleteOne({ id: vehicleId, });
//     const deletedVehicle = await Vehicle.findByIdAndDelete({id:vehicleId});
//     console.log(deletedVehicle)
//     res.json({ success: "Record Deleted" });
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(400);
//   }
// };

const deleteVehicle = async (req, res) => {
  try {
    console.log("deleting");
    const vehicleId = req.params.id;

    // Ensure the vehicleId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
    console.log(deletedVehicle);

    if (deletedVehicle) {
      res.json({ success: "Record Deleted" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


// const uploadImage = async (req, res) => {
//   const { image, userId } = req.body;

//   try {
//       if (!image || image === "") {
//           return res.status(403).json({ message: "Please upload a file" });
//       }
//       if (!userId || userId === "") {
//           return res.status(403).json({ message: "Please login to continue" });
//       }

//       const user = await Image.findOne({ userId });

//       const result = await cloudinary.uploader.upload(image, {
//           folder: "profiles",
//           // width: 300,
//           // crop: "scale"
//       });

//       if (!user) {
//           const createdImage = await Image.create({
//               image: {
//                   public_id: result.public_id,
//                   url: result.secure_url
//               },
//               userId
//           });
//           return res.status(201).json(createdImage);
//       } else {
//           const updatedImage = await updateImage(result, userId, user._id);
//           return res.status(201).json(updatedImage);
//       }
//   } catch (err) {
//       // Handle any errors that occurred during the async operations
//       console.error("Error uploading image:", err);
//       return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// const getImage = async (req, res) => {
//   const { userId } = req.params;
//   if (!userId || userId === "") {
//       return res.status(403).json({ message: "Please login to continue" });
//   }
//   const image = await Image.findOne({ userId});
//   if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//   }
//   return res.status(200).json(image);
// }

// const updateImage = async (result,userId,id) => {
  
//   const updatedImage = await Image.findByIdAndUpdate(
//       id,
//       {
//       image: {
//               public_id: result.public_id,
//               url: result.secure_url
//           },
//          userId
//       },
//       { new: true, runValidators: true }
//     );
  
//   return updatedImage;

// }



module.exports = {
  fetchVehicles,
  fetchVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
