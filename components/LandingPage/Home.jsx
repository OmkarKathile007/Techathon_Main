
"use client";

import Navbar from './Navbar';
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, HeartHandshake, Clock, MapPin, Leaf, ShieldCheck } from 'lucide-react';
import ImageSlider from './ImageSlider';
import Link from 'next/link';
import Script from 'next/script';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-orange-50 w-full flex flex-col p-16 pb-8 lg:pb-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              {/* Text Content */}
              <motion.div 
                variants={fadeIn}
                className="lg:w-1/2 space-y-8"
              >
                <motion.h1 
                  variants={fadeIn}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600"
                >
                  Rescue Food,<br/>Nourish Communities
                </motion.h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-xl text-black"
                >
                  Real-time platform connecting surplus food with local NGOs. Reduce waste, fight hunger, and build sustainable communities.
                </motion.p>

                <motion.div variants={fadeIn} className="flex gap-4">
                  <Link href="/login">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-lg flex items-center gap-2"
                    >
                      <Utensils size={20} />
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image Container */}
              <motion.div 
                variants={fadeIn}
                className="lg:w-1/2 relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageSlider className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeIn} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                    <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">Instant connection between food donors and local NGOs</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                    <MapPin className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Location Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">Smart routing and real-time delivery tracking</p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                    <Leaf className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">Track your environmental impact in real-time</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { icon: HeartHandshake, value: 2500, label: 'NGOs Connected' },
                { icon: Utensils, value: 84500, label: 'Meals Redirected' },
                { icon: Leaf, value: 1200, label: 'Tons Saved' },
                { icon: ShieldCheck, value: 98, label: 'Partner Cities' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="p-6"
                >
                  <item.icon className="w-12 h-12 mx-auto text-orange-500 mb-4" />
                  <div className="text-3xl font-bold mb-2">
                    <span className="text-orange-500">{item.value}</span>+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-white space-y-6"
            >
              <h2 className="text-4xl font-bold">Ready to Make an Impact?</h2>
              <p className="text-xl">Join our network of food heroes today</p>
              <div className="flex justify-center gap-4">
                <Link href="/signup">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg flex items-center gap-2"
                  >
                    <HeartHandshake size={20} />
                    Join Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Watson Assistant Chatbot Integration */}
      <Script id="watson-chat-options" strategy="afterInteractive">
        {`
          window.watsonAssistantChatOptions = {
            integrationID: "c7cf9b64-599b-441d-afb1-b39bcbdb4440", // The ID of this integration.
            region: "au-syd", // The region your integration is hosted in.
            serviceInstanceID: "e800a508-cd46-4310-8aec-21a55012d210", // The ID of your service instance.
            onLoad: async (instance) => { await instance.render(); }
          };
          setTimeout(function(){
            const t = document.createElement('script');
            t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
              (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
              "/WatsonAssistantChatEntry.js";
            document.head.appendChild(t);
          });
        `}
      </Script>
    </>
  );
}

export default Home;
