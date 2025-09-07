

"use client";

import React, { useState, useEffect } from "react";
import { 
    User, HeartHandshake, Recycle, MapPin, Phone, Check, ChevronDown, 
    AlertTriangle, Building, Mail, Clock, Calendar, Utensils, Package, 
    Image as ImageIcon 
} from 'lucide-react';

// --- Reusable UI Components (for cleaner code) ---

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-64 text-slate-500">
    <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg">Loading Donors...</p>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 border-2 border-dashed border-red-200 dark:border-red-800 rounded-lg p-6">
    <AlertTriangle className="h-12 w-12 text-red-400" />
    <h3 className="mt-4 text-xl font-semibold text-red-700 dark:text-red-400">Oops, something went wrong!</h3>
    <p className="mt-2 text-center text-red-600 dark:text-red-500">{message}</p>
  </div>
);

const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-64 bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <Package className="h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-xl font-semibold text-slate-600 dark:text-slate-300">No Data Found</h3>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">{message}</p>
    </div>
);


const NGOTab = () => {
  const [activeTab, setActiveTab] = useState("donors");
  const [expandedIndices, setExpandedIndices] = useState({});
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/donors");
        if (!response.ok) {
          throw new Error("Failed to fetch donors. Please try again later.");
        }
        const data = await response.json();
        // Sort donors by createdAt descending (latest first)
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        setDonors(sorted);
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

  useEffect(() => {
    setExpandedIndices({});
  }, [activeTab]);

  const toggleExpand = (tab, index) => {
    setExpandedIndices(prev => ({
      ...prev,
      [tab]: prev[tab] === index ? null : index,
    }));
  };

  const volunteers = [
    { name: "Aarav Sharma", contact: "+91 98765 43210", location: "Mumbai, Maharashtra", skills: "Logistics, Event Management", availability: "Weekends" },
    { name: "Priya Patel", contact: "+91 87654 32109", location: "Delhi, Delhi", skills: "Community Outreach, Social Media", availability: "Weekdays (Evenings)" },
    { name: "Rohan Das", contact: "+91 76543 21098", location: "Bangalore, Karnataka", skills: "Driving, Inventory Management", availability: "Flexible" },
  ];

  const biogasPlants = [
    { name: "Green Energy Biogas", location: "Pune, Maharashtra", capacity: "150 tons/month", contact: "manager1@greenenergy.com" },
    { name: "Eco Power Solutions", location: "Gurgaon, Haryana", capacity: "200 tons/month", contact: "contact@ecopower.com" },
    { name: "Sustainable Fuels Ltd.", location: "Chennai, Tamil Nadu", capacity: "120 tons/month", contact: "info@sustainablefuels.in" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-5xl border border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center">
          NGO Dashboard
        </h1>

        <div className="flex justify-center border-b border-slate-200 dark:border-slate-700 mb-8">
          {[
            { id: "donors", label: "Active Donors", icon: User },
            { id: "volunteers", label: "Volunteers", icon: HeartHandshake },
            { id: "biogasPlants", label: "Biogas Plants", icon: Recycle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-300 relative ${
                activeTab === id
                  ? "text-orange-500"
                  : "text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400"
              }`}
            >
              <Icon size={18} />
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden min-h-[500px]">
          <div className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${activeTab === "donors" ? "translate-x-0" : "-translate-x-full opacity-0"}`}>
            {loading ? <Loader /> : error ? <ErrorDisplay message={error} /> : (
                donors.length > 0 ? (
                    <ul className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                    {donors.map((donor, index) => (
                      <DonorCard key={donor._id} donor={donor} index={index} expanded={expandedIndices.donors === index} onExpand={() => toggleExpand('donors', index)} />
                    ))}
                  </ul>
                ) : <EmptyState message="There are currently no active donors." />
            )}
          </div>
          
          <div className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${activeTab === "volunteers" ? "translate-x-0" : "translate-x-full opacity-0"}`}>
             <ul className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {volunteers.map((volunteer, index) => (
                    <VolunteerCard key={index} volunteer={volunteer} index={index} expanded={expandedIndices.volunteers === index} onExpand={() => toggleExpand('volunteers', index)}/>
                ))}
             </ul>
          </div>

          <div className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${activeTab === "biogasPlants" ? "translate-x-0" : "translate-x-full opacity-0"}`}>
            <ul className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {biogasPlants.map((plant, index) => (
                   <BiogasCard key={index} plant={plant} index={index} expanded={expandedIndices.biogas === index} onExpand={() => toggleExpand('biogas', index)} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonorCard = ({ donor, index, expanded, onExpand }) => (
  <li className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700">
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full flex-shrink-0">
          <User className="text-orange-500" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{donor.donorName || "Anonymous Donor"}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
             <div className="flex items-center gap-1.5"><Phone size={14} />{donor.contactNumber || "N/A"}</div>
             <div className="flex items-center gap-1.5"><MapPin size={14} />{donor.location?.address || "Location not provided"}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2 self-end sm:self-center">
        <button onClick={onExpand} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
            <ChevronDown size={20} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all text-sm font-semibold flex items-center gap-2">
          <Check size={16} /> Accept
        </button>
      </div>
    </div>
    {expanded && (
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">Donation Details</h4>
            <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Utensils size={14} /><strong>Food Type:</strong> {donor.donation?.foodType || 'N/A'}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Package size={14} /><strong>Quantity:</strong> {donor.donation?.quantity || 'N/A'}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Calendar size={14} /><strong>Donated On:</strong> {new Date(donor.createdAt).toLocaleDateString()}</p>
                 <button 
                  onClick={() => window.open(`https://maps.google.com/?q=${donor.location?.coordinates?.latitude},${donor.location?.coordinates?.longitude}`)}
                  className="mt-2 w-full px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!donor.location?.coordinates?.latitude || !donor.location?.coordinates?.longitude}
                 >
                    <MapPin size={16} /> View Direction
                </button>
            </div>
        </div>
        {donor.donation?.foodImage?.image ? (
            <div>
                 <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2">Food Image</h4>
                 <img src={`data:${donor.donation.foodImage.contentType};base64,${donor.donation.foodImage.image}`} alt="Donated food" className="w-full h-40 object-cover rounded-lg shadow-inner"/>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg h-40">
                <ImageIcon className="text-slate-400" size={32}/>
                <p className="text-slate-500 text-sm mt-2">No Image Provided</p>
            </div>
        )}
      </div>
    )}
  </li>
);

const VolunteerCard = ({ volunteer, expanded, onExpand }) => (
    <li className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full flex-shrink-0"><HeartHandshake className="text-sky-500" size={20}/></div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{volunteer.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{volunteer.location}</p>
                </div>
            </div>
            <button onClick={onExpand} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm font-semibold flex items-center justify-center gap-2 self-end sm:self-center">
                {expanded ? 'Collapse' : 'View Info'} <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
        </div>
        {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm space-y-2">
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Phone size={14}/><strong>Contact:</strong> {volunteer.contact}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Clock size={14}/><strong>Availability:</strong> {volunteer.availability}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Check size={14}/><strong>Skills:</strong> {volunteer.skills}</p>
            </div>
        )}
    </li>
);

const BiogasCard = ({ plant, expanded, onExpand }) => (
    <li className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full flex-shrink-0"><Building className="text-teal-500" size={20}/></div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{plant.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{plant.location}</p>
                </div>
            </div>
             <button onClick={onExpand} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm font-semibold flex items-center justify-center gap-2 self-end sm:self-center">
                {expanded ? 'Collapse' : 'Details'} <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
        </div>
        {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm space-y-2">
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Recycle size={14}/><strong>Capacity:</strong> {plant.capacity}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Mail size={14}/><strong>Contact Email:</strong> {plant.contact}</p>
            </div>
        )}
    </li>
);

export default NGOTab;