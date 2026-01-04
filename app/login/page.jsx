"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Building2, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const userTypes = [
  {
    id: "donor",
    title: "Donor",
    icon: Heart,
    color: "text-pink-500",
    description: "Support causes you care about",
  },
  {
    id: "ngo",
    title: "NGO",
    icon: Building2,
    color: "text-blue-500",
    description: "Create impact at scale",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    icon: Users,
    color: "text-green-500",
    description: "Contribute your time and skills",
  },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState("donor");
  const [tab, setTab] = useState("login");
  
  // State for forms
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To show spinner/disable button
  const router = useRouter();

  // --- HANDLERS ---

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.id]: e.target.value });
  };

  // --- API LOGIC: LOGIN ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // MAPPING: Backend expects 'username', we send 'email'
          username: loginForm.email, 
          password: loginForm.password,
        }),
      });

      if (!response.ok) {
        // Handle 401/403 errors
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      
      // 1. Store the Token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", selectedType); // Optional: store role for UI logic

      // 2. Redirect
      router.push(`/${selectedType}`);

    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // --- API LOGIC: SIGNUP ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Basic Validation
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // We use email as the username for simplicity
          username: signupForm.email, 
          email: signupForm.email,
          password: signupForm.password,
          // Send the selected role (e.g., "DONOR")
          roles: [selectedType.toUpperCase()] 
        }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Backend might send text error
        throw new Error("Registration failed: " + errorData);
      }

      const data = await response.json();

      // 1. Store Token
      localStorage.setItem("token", data.token);
      
      // 2. Redirect
      router.push(`/${selectedType}`);

    } catch (err) {
      console.error(err);
      setError("Registration failed. Email might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex text-black items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
        <div className="grid md:grid-cols-5 gap-6">
          
          {/* Left Side: Role Selection */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-orange-400">Welcome Back</h1>
            <p className="text-black">Choose your role to continue</p>
            <div className="space-y-4">
              {userTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="button"
                    className={`w-full flex items-center p-4 border rounded-lg space-x-4 transition ${
                      selectedType === type.id
                        ? "border-orange-500 bg-orange-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <type.icon className={`h-5 w-5 ${type.color}`} />
                    <div>
                      <div className="font-medium text-left">{type.title}</div>
                      <div className="text-xs text-gray-600 text-left">
                        {type.description}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Forms */}
          <div className="md:col-span-3">
            {/* Tabs */}
            <div className="flex w-full border-b text-black mb-4">
              <button
                type="button"
                className={`w-1/2 p-2 text-center ${
                  tab === "login"
                    ? "border-b-2 border-orange-500 font-medium"
                    : "text-black"
                }`}
                onClick={() => { setTab("login"); setError(""); }}
              >
                Login
              </button>
              <button
                type="button"
                className={`w-1/2 p-2 text-center ${
                  tab === "signup"
                    ? "border-b-2 border-orange-500 font-medium"
                    : "text-black"
                }`}
                onClick={() => { setTab("signup"); setError(""); }}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 p-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            ) : (
              /* SIGNUP FORM */
              <form onSubmit={handleSignupSubmit} className="space-y-4 p-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-black">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={signupForm.name}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Creating Account..." : `Sign Up as ${userTypes.find(u => u.id === selectedType)?.title}`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}