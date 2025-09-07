

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
// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { HiUserCircle, HiOutlineBell, HiOutlineMenu, HiOutlineSearch } from 'react-icons/hi';

// export default function DonorNavbar({ donorName = 'User', points = 150 }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const onDown = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
//     };
//     document.addEventListener('mousedown', onDown);
//     return () => document.removeEventListener('mousedown', onDown);
//   }, []);

//   const handleRedeem = () => {
//     setIsOpen(false);
//     router.push('/redeem');
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* left: logo + brand */}
//           <div className="flex items-center gap-4">
//             <button
//               className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100"
//               onClick={() => setIsMobileMenuOpen((s) => !s)}
//               aria-label="Toggle menu"
//             >
//               <HiOutlineMenu className="h-6 w-6 text-slate-700" />
//             </button>

//             <Link href="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-md">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M4 12h16" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M6 8h12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-lg font-extrabold text-slate-800 leading-[1]">DonorHub</div>
//                 <div className="text-xs text-slate-400 -mt-0.5">Share a meal — spread a smile</div>
//               </div>
//             </Link>
//           </div>

//           {/* center: search (hidden on small) */}
//           <div className="hidden md:flex md:items-center md:justify-center flex-1 px-6">
//             <div className="w-full max-w-lg">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <HiOutlineSearch className="h-5 w-5 text-slate-400" />
//                 </span>
//                 <input
//                   className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm"
//                   placeholder="Search donors, locations or campaigns"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* right: actions + profile */}
//           <div className="flex items-center gap-4">
//             <nav className="hidden md:flex items-center gap-4">
//               <Link href="/donations" className="text-sm text-slate-600 hover:text-slate-800">Donations</Link>
//               <Link href="/partners" className="text-sm text-slate-600 hover:text-slate-800">Partners</Link>
//               <Link href="/about" className="text-sm text-slate-600 hover:text-slate-800">About</Link>
//             </nav>

//             <button
//               className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md"
//               onClick={() => router.push('/create-donation')}
//             >
//               <span className="text-sm font-medium text-orange-600">+ Donate</span>
//             </button>

//             <button className="p-2 rounded-full hover:bg-slate-100" aria-label="Notifications">
//               <HiOutlineBell className="h-5 w-5 text-slate-600" />
//             </button>

//             <div className="relative" ref={menuRef}>
//               <button
//                 onClick={() => setIsOpen((s) => !s)}
//                 className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 focus:outline-none"
//                 aria-haspopup="true"
//                 aria-expanded={isOpen}
//               >
//                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 text-white flex items-center justify-center font-semibold">{donorName?.charAt(0).toUpperCase()}</div>
//                 <div className="hidden sm:flex flex-col text-left">
//                   <span className="text-sm font-medium text-slate-800">Hi, {donorName}</span>
//                   <span className="text-xs text-slate-400">{points} pts</span>
//                 </div>
//               </button>

//               <div className={`absolute right-0 mt-3 w-56 rounded-lg bg-white border border-slate-100 shadow-lg overflow-hidden transition-transform origin-top-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
//                 <div className="p-3 text-sm text-slate-700">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-xs text-slate-400">Points</div>
//                       <div className="font-semibold text-slate-800">{points}</div>
//                     </div>
//                     <div>
//                       <button onClick={handleRedeem} className="px-3 py-1 rounded-md bg-orange-500 text-white text-xs hover:brightness-95">Redeem</button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t border-slate-100" />
//                 <Link href="/profile">
//                   <p className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Profile</p>
//                 </Link>
//                 <Link href="/settings">
//                   <p className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Settings</p>
//                 </Link>
//                 <button onClick={() => { /* logout placeholder */ }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50">Logout</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu (slide down) */}
//       <div className={`md:hidden bg-white border-t border-slate-100 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="px-4 py-3 space-y-2">
//           <Link href="/donations"><p className="block text-sm text-slate-700">Donations</p></Link>
//           <Link href="/partners"><p className="block text-sm text-slate-700">Partners</p></Link>
//           <Link href="/about"><p className="block text-sm text-slate-700">About</p></Link>
//           <Link href="/redeem"><p className="block text-sm text-slate-700">Redeem</p></Link>
//           <button onClick={() => router.push('/create-donation')} className="w-full text-left px-3 py-2 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 text-white">Donate</button>
//         </div>
//       </div>
//     </header>
//   );
// }
