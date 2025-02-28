

// "use client";

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUtensils, faCamera, faUsers } from "@fortawesome/free-solid-svg-icons";

// const DonorFlow = () => {
//   const [donorName, setDonorName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [donorType, setDonorType] = useState("individual");

//   const [foodFor, setFoodFor] = useState("");
//   const [foodType, setFoodType] = useState("veg");
//   const [quantity, setQuantity] = useState(">5");
//   const [foodImage, setFoodImage] = useState(null);

//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState(null);

//   const [currentCard, setCurrentCard] = useState("donorInfo");

//   // Function to submit donation data to backend
//   const submitDonation = async () => {
//     // Create a FormData object to send multipart/form-data (including the file)
//     const formData = new FormData();
//     formData.append("donorName", donorName);
//     formData.append("contactNumber", contactNumber);
//     formData.append("donorType", donorType);
//     formData.append("foodFor", foodFor);
//     formData.append("foodType", foodFor === "humans" ? foodType : "Not applicable");
//     formData.append("quantity", foodFor === "humans" ? quantity : "Not applicable");
//     if (foodImage) {
//       formData.append("foodImage", foodImage);
//     }
//     formData.append("address", address);
//     formData.append("latitude", location?.latitude || 0);
//     formData.append("longitude", location?.longitude || 0);

//     try {
//       const res = await fetch("http://localhost:5000/api/donations", {
//         method: "POST",
//         body: formData, // Browser automatically sets the correct multipart/form-data header
//       });
//       const data = await res.json();
//       console.log("Donation saved:", data);
//     } catch (err) {
//       console.error("Error saving donation:", err);
//     }
//   };

//   // Step 1: Donor Info Card
//   const handleDonorInfoSubmit = (e) => {
//     e.preventDefault();
//     setCurrentCard("donorForm");
//   };

//   // Step 2: Food Donation Form Card
//   const handleDonorFormSubmit = (e) => {
//     e.preventDefault();
//     if (!foodFor) {
//       alert("Please select who the food is for.");
//       return;
//     }
//     setCurrentCard("donationLocation");
//   };

//   // Step 3: Donation Location Card & Final Submission
//   const handleDonationLocationSubmit = async (e) => {
//     e.preventDefault();
//     await submitDonation();
//     alert("Donation details submitted successfully!");
//   };

//   // Get current geolocation coordinates
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Unable to fetch location. Please enable location access.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };

//   // Donor Information card
//   const renderDonorInfoCard = () => (
//     <div className="relative flex items-center justify-center min-h-screen p-4">
//       <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-10"></div>
//       <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] flex flex-col justify-center space-y-4">
//         <h1 className="text-2xl font-bold text-center text-orange-600">Donor Information</h1>
//         <form onSubmit={handleDonorInfoSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Donor Type</label>
//             <div className="grid grid-cols-3 gap-2">
//               {["individual", "restaurant", "event_organization"].map((type) => (
//                 <label
//                   key={type}
//                   className={`flex items-center justify-center p-2 rounded-lg text-sm cursor-pointer transition-all ${
//                     donorType === type
//                       ? "bg-orange-600 text-white shadow-md"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     value={type}
//                     checked={donorType === type}
//                     onChange={(e) => setDonorType(e.target.value)}
//                     className="hidden"
//                   />
//                   <span className="capitalize">{type.replace("_", " ")}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Donor Name</label>
//             <input
//               type="text"
//               value={donorName}
//               onChange={(e) => setDonorName(e.target.value)}
//               className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="Enter donor name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//             <input
//               type="tel"
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="Enter contact number"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   // Food Donation Form card
//   const renderDonorFormCard = () => (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-orange-600 mb-2 text-center">Food Donation</h1>
//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Help us make a difference by donating food.
//         </p>

//         <form onSubmit={handleDonorFormSubmit}>
//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FontAwesomeIcon icon={faUtensils} className="text-orange-600 mr-2" />
//             Food for:
//           </label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             value={foodFor}
//             onChange={(e) => setFoodFor(e.target.value)}
//             required
//           >
//             <option value="">Select</option>
//             <option value="humans">Humans</option>
//             <option value="animals">Street Animals</option>
//           </select>

//           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FontAwesomeIcon icon={faCamera} className="text-orange-600 mr-2" />
//             Upload Food Image:
//           </label>
//           <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
//             <input
//               type="file"
//               className="w-full p-2 opacity-0 absolute cursor-pointer"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setFoodImage(e.target.files[0]);
//                 }
//               }}
//             />
//             <span className="text-sm text-gray-600 ml-3">
//               {foodImage ? foodImage.name : "Choose a file"}
//             </span>
//           </div>

//           {foodFor === "humans" && (
//             <>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Food Type:</label>
//               <div className="flex gap-4 mb-4">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="foodType"
//                     value="veg"
//                     checked={foodType === "veg"}
//                     onChange={() => setFoodType("veg")}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 border-2 rounded-full mr-2 ${
//                       foodType === "veg" ? "border-green-600 bg-green-600" : "border-gray-300"
//                     }`}
//                   ></span>
//                   Veg
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="foodType"
//                     value="nonveg"
//                     checked={foodType === "nonveg"}
//                     onChange={() => setFoodType("nonveg")}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 border-2 rounded-full mr-2 ${
//                       foodType === "nonveg" ? "border-red-600 bg-red-600" : "border-gray-300"
//                     }`}
//                   ></span>
//                   Non-Veg
//                 </label>
//               </div>

//               <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (for humans):</label>
//               <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
//                 <FontAwesomeIcon icon={faUsers} className="text-orange-600 ml-3" />
//                 <select
//                   className="w-full p-3 bg-transparent outline-none text-gray-700"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 >
//                   <option value=">5">{">"} 5 people</option>
//                   <option value=">10">{">"} 10 people</option>
//                   <option value=">25">{">"} 25 people</option>
//                   <option value=">50">{">"} 50 people</option>
//                   <option value="50+">50+ people</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   // Donation Location card
//   const renderDonationLocationCard = () => (
//     <div className="relative flex items-center justify-center min-h-screen p-4">
//       <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-50"></div>
//       <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] flex flex-col justify-center space-y-4">
//         <h1 className="text-2xl font-bold text-center text-orange-600">Donation Location</h1>
//         <form onSubmit={handleDonationLocationSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               placeholder="Enter your address"
//               required
//             />
//           </div>

//           <button
//             type="button"
//             onClick={getLocation}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Get Location
//           </button>

//           {location && (
//             <p className="text-sm text-gray-700 text-center">
//               Latitude: {location.latitude}, Longitude: {location.longitude}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//           >
//             Submit Donation
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {currentCard === "donorInfo" && renderDonorInfoCard()}
//       {currentCard === "donorForm" && renderDonorFormCard()}
//       {currentCard === "donationLocation" && renderDonationLocationCard()}
//     </>
//   );
// };

// export default DonorFlow;

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCamera, faUsers } from "@fortawesome/free-solid-svg-icons";

const DonorFlow = () => {
  const [donorName, setDonorName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [donorType, setDonorType] = useState("individual");

  const [foodFor, setFoodFor] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [quantity, setQuantity] = useState(">5");
  const [foodImage, setFoodImage] = useState(null);

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  // State for storing prediction results from the backend
  const [prediction, setPrediction] = useState(null);

  const [currentCard, setCurrentCard] = useState("donorInfo");

  // Function to call the prediction endpoint when an image is uploaded
  const handlePredictImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  // File change handler: set the file and call prediction
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoodImage(file);
      handlePredictImage(file);
    }
  };

  // Function to submit donation data (this endpoint is separate from prediction)
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
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Donation saved:", data);
    } catch (err) {
      console.error("Error saving donation:", err);
    }
  };

  // Step 1: Donor Info Card
  const handleDonorInfoSubmit = (e) => {
    e.preventDefault();
    setCurrentCard("donorForm");
  };

  // Step 2: Food Donation Form Card
  const handleDonorFormSubmit = (e) => {
    e.preventDefault();
    if (!foodFor) {
      alert("Please select who the food is for.");
      return;
    }
    setCurrentCard("donationLocation");
  };

  // Step 3: Donation Location Card & Final Submission
  const handleDonationLocationSubmit = async (e) => {
    e.preventDefault();
    await submitDonation();
    alert("Donation details submitted successfully!");
  };

  // Get current geolocation coordinates
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

  // Donor Information card
  const renderDonorInfoCard = () => (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] flex flex-col justify-center space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">Donor Information</h1>
        <form onSubmit={handleDonorInfoSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donor Type</label>
            <div className="grid grid-cols-3 gap-2">
              {["individual", "restaurant", "event_organization"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center p-2 rounded-lg text-sm cursor-pointer transition-all ${
                    donorType === type
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={donorType === type}
                    onChange={(e) => setDonorType(e.target.value)}
                    className="hidden"
                  />
                  <span className="capitalize">{type.replace("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Donor Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter donor name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter contact number"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );

  // Food Donation Form card
  const renderDonorFormCard = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2 text-center">Food Donation</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Help us make a difference by donating food.
        </p>

        <form onSubmit={handleDonorFormSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faUtensils} className="text-orange-600 mr-2" />
            Food for:
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={foodFor}
            onChange={(e) => setFoodFor(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="humans">Humans</option>
            <option value="animals">Street Animals</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faCamera} className="text-orange-600 mr-2" />
            Upload Food Image:
          </label>
          <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
            <input
              type="file"
              className="w-full p-2 opacity-0 absolute cursor-pointer"
              onChange={handleFileChange}
            />
            <span className="text-sm text-gray-600 ml-3">
              {foodImage ? foodImage.name : "Choose a file"}
            </span>
          </div>

          {/* Display prediction result if available */}
          {prediction && (
            <div className="text-center my-2 p-2 border border-dashed rounded">
              {prediction.binary_result === "Food" ? (
                <p>
                  Predicted Food: <strong>{prediction.food_name}</strong>
                </p>
              ) : (
                <p>{prediction.message}</p>
              )}
            </div>
          )}

          {foodFor === "humans" && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Type:</label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="foodType"
                    value="veg"
                    checked={foodType === "veg"}
                    onChange={() => setFoodType("veg")}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 border-2 rounded-full mr-2 ${
                      foodType === "veg" ? "border-green-600 bg-green-600" : "border-gray-300"
                    }`}
                  ></span>
                  Veg
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="foodType"
                    value="nonveg"
                    checked={foodType === "nonveg"}
                    onChange={() => setFoodType("nonveg")}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 border-2 rounded-full mr-2 ${
                      foodType === "nonveg" ? "border-red-600 bg-red-600" : "border-gray-300"
                    }`}
                  ></span>
                  Non-Veg
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (for humans):</label>
              <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-orange-600 ml-3" />
                <select
                  className="w-full p-3 bg-transparent outline-none text-gray-700"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option value=">5">{">"} 5 people</option>
                  <option value=">10">{">"} 10 people</option>
                  <option value=">25">{">"} 25 people</option>
                  <option value=">50">{">"} 50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );

  // Donation Location card
  const renderDonationLocationCard = () => (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-50"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] flex flex-col justify-center space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">Donation Location</h1>
        <form onSubmit={handleDonationLocationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your address"
              required
            />
          </div>

          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Location
          </button>

          {location && (
            <p className="text-sm text-gray-700 text-center">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {currentCard === "donorInfo" && renderDonorInfoCard()}
      {currentCard === "donorForm" && renderDonorFormCard()}
      {currentCard === "donationLocation" && renderDonationLocationCard()}
    </>
  );
};

export default DonorFlow;