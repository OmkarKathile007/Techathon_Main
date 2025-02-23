
"use client";

import React, { useState, useEffect } from "react";

const NGOTab = () => {
  // State for active tab and expanded card indices
  const [activeTab, setActiveTab] = useState("donors");
  const [expandedDonorIndex, setExpandedDonorIndex] = useState(null);
  const [expandedVolunteerIndex, setExpandedVolunteerIndex] = useState(null);
  const [expandedPlantIndex, setExpandedPlantIndex] = useState(null);

  // State for donor data, loading and error management
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donors from the backend API when the "donors" tab is active
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        // Updated endpoint to match backend: /api/donors
        const response = await fetch("http://localhost:5000/api/donors");
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }
        const data = await response.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "donors") {
      fetchDonors();
    }
  }, [activeTab]);

  // Reset expanded card indices when switching tabs
  useEffect(() => {
    setExpandedDonorIndex(null);
    setExpandedVolunteerIndex(null);
    setExpandedPlantIndex(null);
  }, [activeTab]);

  // Volunteers and Biogas Plants data remain as sample arrays,
  // until you add proper API endpoints for them.
  const volunteers = [
    {
      name: "Volunteer 1",
      contact: "+91 12345 67890",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Volunteer 2",
      contact: "+91 23456 78901",
      location: "Delhi, Delhi",
    },
    {
      name: "Volunteer 3",
      contact: "+91 34567 89012",
      location: "Bangalore, Karnataka",
    },
  ];

  const biogasPlants = [
    {
      name: "Biogas Plant 1",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Biogas Plant 2",
      location: "Delhi, Delhi",
    },
    {
      name: "Biogas Plant 3",
      location: "Bangalore, Karnataka",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">
          NGO Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "donors"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            List Donors
          </button>
          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "volunteers"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            Volunteers
          </button>
          <button
            onClick={() => setActiveTab("biogasPlants")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "biogasPlants"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            Biogas Plants
          </button>
        </div>

        {/* Sliding Cards Container */}
        <div className="relative overflow-hidden h-96">
          {/* Donors Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "donors" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Donors
              </h2>

              {loading && (
                <p className="text-center text-gray-600">Loading donors...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}

              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {donors.map((donor, index) => (
                  <li
                    key={donor._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-orange-700">
                          {donor.donorName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {donor.contactNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donor.location.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donor.location.coordinates.latitude}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donor.location.coordinates.longitude}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                          onClick={() =>
                            setExpandedDonorIndex(
                              expandedDonorIndex === index ? null : index
                            )
                          }
                        >
                          {expandedDonorIndex === index
                            ? "Collapse"
                            : "View Details"}
                        </button>
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${donor.location.coordinates.latitude},${donor.location.coordinates.longitude}`
                            )
                          }
                        >
                          View Direction
                        </button>
                      </div>
                    </div>
                    {expandedDonorIndex === index && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Type:</span>{" "}
                              {donor.donorType}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Food For:</span>{" "}
                              {donor.donation.foodFor}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">
                                Food Type:
                              </span>{" "}
                              {donor.donation.foodType}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">
                                Quantity:
                              </span>{" "}
                              {donor.donation.quantity}
                            </p>
                          </div>
                          {donor.donation.foodImage && (
                            <div>
                              <img
                                src={`data:${donor.donation.foodImage.contentType};base64,${donor.donation.foodImage.image}`}
                                alt="Donated food"
                                className="max-h-32 rounded-lg object-cover"
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                          <span className="font-semibold">Registered:</span>{" "}
                          {new Date(donor.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Volunteers Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "volunteers" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Volunteers
              </h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {volunteers.map((volunteer, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-orange-700">
                          {volunteer.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {volunteer.contact}
                        </p>
                        <p className="text-sm text-gray-600">
                          {volunteer.location}
                        </p>
                      </div>
                      <button
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                        onClick={() =>
                          setExpandedVolunteerIndex(
                            expandedVolunteerIndex === index ? null : index
                          )
                        }
                      >
                        {expandedVolunteerIndex === index
                          ? "Collapse"
                          : "Contact"}
                      </button>
                    </div>
                    {expandedVolunteerIndex === index && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Email: volunteer{index + 1}@example.com
                        </p>
                        <p className="text-sm text-gray-600">
                          Availability: Weekdays 9AM-5PM
                        </p>
                        <p className="text-sm text-gray-600">
                          Skills: Logistics, Community Outreach
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Biogas Plants Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "biogasPlants" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Biogas Plants
              </h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {biogasPlants.map((plant, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-orange-700">
                          {plant.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {plant.location}
                        </p>
                      </div>
                      <button
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                        onClick={() =>
                          setExpandedPlantIndex(
                            expandedPlantIndex === index ? null : index
                          )
                        }
                      >
                        {expandedPlantIndex === index ? "Collapse" : "Details"}
                      </button>
                    </div>
                    {expandedPlantIndex === index && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          Capacity: 50 tons/month
                        </p>
                        <p className="text-sm text-gray-600">
                          Operational Since: 2022
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: plantmanager{index + 1}@biogas.com
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOTab;
