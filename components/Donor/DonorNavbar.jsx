

"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';

const DonorNavbar = ({ donorName = "User", points = 150 }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRedeem = () => {
    console.log('Navigating to /redeem');
    router.push('/redeem'); // Navigate to /redeem route
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-orange-600">DonorHub</span>
          </div>
          


          {/* Profile Section */}
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            <span className="hidden md:inline text-gray-700">Hi, {donorName}</span>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <HiUserCircle className="h-8 w-8" />
            </button>
            <Link href='/redeem' className=''>
               <p className='text-black my-auto'>Redeem</p>
            </Link>

            
            {/* Dropdown */}
            <div
              className={`absolute right-0 top-16 mt-2 w-48 bg-white rounded-md shadow-lg py-2 transition-all duration-300 ease-out ${
                isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div className="px-4 py-2 text-sm text-gray-700">
                Points: {points}
              </div>
              <Link href='/redeem'>
              <button
                onClick={handleRedeem}
                className="w-full text-left bg-orange-500 px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
              >
                Redeem Points
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DonorNavbar;
