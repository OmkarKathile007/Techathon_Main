const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const Donor = require("./database/schema/Donor");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const mongoURI =  'mongodb+srv://magarsaurabh59:KGgEB4izM7PRapuo@cluster0.lq6uf.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// API Endpoints

// GET: Fetch all donors
app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find({}).lean();
    
    // Convert image buffer to base64 string
    const processedDonors = donors.map(donor => ({
      ...donor,
      donation: {
        ...donor.donation,
        foodImage: donor.donation.foodImage ? {
          image: donor.donation.foodImage.image.toString("base64"),
          contentType: donor.donation.foodImage.contentType
        } : null
      },
      _id: donor._id.toString(),
      createdAt: donor.createdAt.toISOString()
    }));

    res.status(200).json(processedDonors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST: Create new donation
app.post("/api/donations", upload.single("foodImage"), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      'donorName', 
      'contactNumber',
      'donorType',
      'foodFor',
      'address',
      'latitude',
      'longitude'
    ];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Process image upload if provided
    const foodImageData = req.file ? {
      image: req.file.buffer,
      contentType: req.file.mimetype
    } : null;

    // Construct donation data
    const donationData = {
      foodFor: req.body.foodFor,
      foodType: req.body.foodFor === "humans" ? req.body.foodType : "Not applicable",
      quantity: req.body.foodFor === "humans" ? req.body.quantity : "Not applicable",
      foodImage: foodImageData
    };

    // Create new donor document
    const newDonation = new Donor({
      donorName: req.body.donorName,
      contactNumber: req.body.contactNumber,
      donorType: req.body.donorType,
      donation: donationData,
      location: {
        address: req.body.address,
        coordinates: {
          latitude: parseFloat(req.body.latitude),
          longitude: parseFloat(req.body.longitude)
        }
      }
    });

    // Save to MongoDB
    const savedDonation = await newDonation.save();
    
    // Convert image buffer to base64 string for response if needed
    const responseData = savedDonation.toObject();
    if (responseData.donation.foodImage) {
      responseData.donation.foodImage.image = 
        responseData.donation.foodImage.image.toString("base64");
    }

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
