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
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
   
    router.push(`/${selectedType}`);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    
    router.push(`/${selectedType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex text-black items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6">
        <div className="grid md:grid-cols-5 gap-6">
        
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
                      <div className="font-medium">{type.title}</div>
                      <div className="text-sm text-black">
                        {type.description}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        
          <div className="md:col-span-3">
            <div className="flex w-full border-b text-black">
              <button
                type="button"
                className={`w-1/2 p-2 text-center ${
                  tab === "login"
                    ? "border-b-2 border-orange-500 font-medium"
                    : "text-black"
                }`}
                onClick={() => {
                  setTab("login");
                  setError("");
                }}
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
                onClick={() => {
                  setTab("signup");
                  setError("");
                }}
              >
                Sign Up
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {tab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 p-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded-lg"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" className="text-sm text-orange-500">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-orange-500 text-white rounded-lg"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4 p-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-2 border rounded-lg"
                    value={signupForm.name}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full p-2 border rounded-lg"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-black"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full p-2 border rounded-lg"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-orange-500 text-white rounded-lg"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
