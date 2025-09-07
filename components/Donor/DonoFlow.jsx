


"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCamera, faUsers, faMapMarkerAlt, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function DonorFlow() {
  const [donorName, setDonorName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [donorType, setDonorType] = useState("individual");

  const [foodFor, setFoodFor] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [quantity, setQuantity] = useState(">5");
  const [foodImage, setFoodImage] = useState(null);

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [currentCard, setCurrentCard] = useState("donorInfo");

  // Prediction & upload logic (kept the same as original)
  const handlePredictImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5010/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoodImage(file);
      handlePredictImage(file);
    }
  };

  const submitDonation = async () => {
    const formData = new FormData();
    formData.append("donorName", donorName);
    formData.append("contactNumber", contactNumber);
    formData.append("donorType", donorType);
    formData.append("foodFor", foodFor);
    formData.append("foodType", foodFor === "humans" ? foodType : "Not applicable");
    formData.append("quantity", foodFor === "humans" ? quantity : "Not applicable");
    if (foodImage) {
      formData.append("foodImage", foodImage);
    }
    formData.append("address", address);
    formData.append("latitude", location?.latitude || 0);
    formData.append("longitude", location?.longitude || 0);

    try {
      const res = await fetch("http://localhost:8080/api/donations", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Donation saved:", data);
    } catch (err) {
      console.error("Error saving donation:", err);
    }
  };

  const handleDonorInfoSubmit = (e) => {
    e.preventDefault();
    setCurrentCard("donorForm");
  };

  const handleDonorFormSubmit = (e) => {
    e.preventDefault();
    if (!foodFor) {
      alert("Please select who the food is for.");
      return;
    }
    setCurrentCard("donationLocation");
  };

  const handleDonationLocationSubmit = async (e) => {
    e.preventDefault();
    await submitDonation();
    alert("Donation details submitted successfully!");
    // reset or go to a success screen if needed
    setCurrentCard("donorInfo");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const Step = ({ step, active }) => (
    <div className="flex-1 flex items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${active ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}>
        {step}
      </div>
      <div className={`h-1 flex-1 ml-3 ${active ? 'bg-gradient-to-r from-orange-300 to-pink-300' : 'bg-gray-200'}`} />
    </div>
  );

  return (
    <div className="min-h-screen flex  items-center justify-center p-6 bg-orange-50">
      <div className="w-full max-w-4xl grid grid-cols-12 gap-6">
        {/* Left panel - visual */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="col-span-5 hidden md:flex items-center justify-center">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/60 to-orange-50/40 backdrop-blur-md border border-white/40 p-6 text-black">
            <img src="/images/food_donation.jpg" alt="food" className="w-full h-72 object-cover rounded-xl mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">Share a meal, spread a smile</h2>
            <p className="text-sm text-slate-600 mt-2">Simple, fast and secure donations — reach those who need it the most.</p>
            <div className="mt-6 flex gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-black">Donations</div>
                <div className="text-lg font-bold">1.2k+</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">Active Partners</div>
                <div className="text-lg font-bold">85</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right panel - form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="col-span-12 md:col-span-7 bg-white rounded-2xl shadow-2xl p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-black">Donor Flow</h1>
                <p className="text-sm text-slate-500">A polished donation experience — quick steps to submit your food donation.</p>
              </div>
              <div className="text-xs text-slate-400">Step {currentCard === 'donorInfo' ? 1 : currentCard === 'donorForm' ? 2 : 3} of 3</div>
            </div>

            {/* Step indicator */}
            <div className="mt-4 grid grid-cols-3 gap-3 items-center">
              <div className="col-span-1">
                <Step step={1} active={currentCard === 'donorInfo'} />
              </div>
              <div className="col-span-1">
                <Step step={2} active={currentCard === 'donorForm'} />
              </div>
              <div className="col-span-1">
                <Step step={3} active={currentCard === 'donationLocation'} />
              </div>
            </div>
          </div>

          {/* Cards */}
          {currentCard === 'donorInfo' && (
            <motion.form onSubmit={handleDonorInfoSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-sm font-medium text-gray-600">Donor Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['individual', 'restaurant', 'event_organization'].map((type) => (
                    <button type="button" key={type} onClick={() => setDonorType(type)} className={`w-full py-3 rounded-xl text-sm font-medium border transition-all ${donorType === type ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg' : 'bg-gray-50 border-gray-200 text-slate-700 hover:scale-[1.02]'}`}>
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-black">
                <div>
                  <label className="block text-sm font-medium  text-black">Donor Name</label>
                  <input required value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Enter donor name" className="mt-2 w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-black" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">Contact Number</label>
                  <input  required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter contact number" className="mt-2 w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-black" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => { /* nothing - no back */ }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-100 text-black" disabled>
                  <FontAwesomeIcon icon={faChevronLeft} /> Back
                </button>
                <button type="submit" className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-br from-orange-500 to-pink-500 shadow hover:scale-[1.02]">
                  Next <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </motion.form>
          )}

          {currentCard === 'donorForm' && (
            <motion.form onSubmit={handleDonorFormSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-black">Food for</label>
                <select required value={foodFor} onChange={(e) => setFoodFor(e.target.value)} className="mt-2 w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option value="">Select</option>
                  <option value="humans">Humans</option>
                  <option value="animals">Street Animals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Upload Food Image</label>
                <div className="mt-2 relative border-2 border-dashed rounded-xl p-3 flex items-center gap-3 bg-gray-50">
                  <div className="flex-1">
                    <input onChange={handleFileChange} type="file" accept="image/*" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                    <div className="pointer-events-none flex items-center gap-3">
                      <FontAwesomeIcon icon={faCamera} className="text-orange-400" />
                      <div>
                        <div className="text-sm text-black">{foodImage ? foodImage.name : 'Click or drop an image'}</div>
                        <div className="text-xs text-black mt-1">We check image to identify food items (optional)</div>
                      </div>
                    </div>
                  </div>

                  {foodImage && (
                    <img src={URL.createObjectURL(foodImage)} alt="preview" className="w-20 h-20 rounded-md object-cover ml-2" />
                  )}
                </div>

                {prediction && (
                  <div className="mt-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                    {prediction.binary_result === 'Food' ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-black">Predicted</div>
                          <div className="font-semibold">{prediction.food_name}</div>
                        </div>
                        <div className="text-sm text-green-600 font-medium">Confidence: {(prediction.confidence || 0).toFixed(2)}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-black">{prediction.message}</div>
                    )}
                  </div>
                )}
              </div>

              {foodFor === 'humans' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black">Food Type</label>
                    <div className="mt-2 flex gap-3">
                      <button type="button" onClick={() => setFoodType('veg')} className={`px-4 py-2 rounded-lg ${foodType === 'veg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
                        Veg
                      </button>
                      <button type="button" onClick={() => setFoodType('nonveg')} className={`px-4 py-2 rounded-lg ${foodType === 'nonveg' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>
                        Non-Veg
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Quantity</label>
                    <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-2 w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                      <option value=">5">{">"} 5 people</option>
                      <option value=">10">{">"} 10 people</option>
                      <option value=">25">{">"} 25 people</option>
                      <option value=">50">{">"} 50 people</option>
                      <option value="50+">50+ people</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setCurrentCard('donorInfo')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-100 text-slate-700">
                  <FontAwesomeIcon icon={faChevronLeft} /> Back
                </button>
                <button type="submit" className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-br from-orange-500 to-pink-500 shadow hover:scale-[1.02]">
                  Next <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </motion.form>
          )}

          {currentCard === 'donationLocation' && (
            <motion.form onSubmit={handleDonationLocationSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full address" className="mt-2 w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={getLocation} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Get Location
                </button>

                <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm text-slate-600">
                  {location ? `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}` : 'Location not set'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setCurrentCard('donorForm')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-100 text-slate-700">
                  <FontAwesomeIcon icon={faChevronLeft} /> Back
                </button>

                <button type="submit" className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-br from-orange-500 to-pink-500 shadow hover:scale-[1.02]">
                  Submit Donation
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
