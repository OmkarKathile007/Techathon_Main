"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { LogoPng } from "@/public/Shared/itemData";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="z-50 fixed bg-white text-black w-full shadow-[0_10px_80px_-30px_rgba(0,0,0,0.2)] shadow-black  border-gray-300">
      <div className="flex items-center justify-between p-4 w-full h-full">
        <div className="flex items-center">
          {/* <h1 className="text-3xl md:text-4xl  font-bold ml-2 ">
            SurplusShift
          </h1> */}
          {/* <Image src={LogoPng} alt="food logo"  className="w-[200px]" /> */}
          <div className="flex flex-col items-center justify-center  ">
            <h1
              className={`font-semibold text-orange-400 text-4xl tracking-wide `}
            >
              SurplusShift
            </h1>
            
          </div>
        </div>

        <div className="hidden md:flex list-none gap-6 text-red items-center">
          <Link href="/statistics" className="hover:text-orange-500">
            Statistics
          </Link>

          <Link
            href="/login"
            className="border-orange-500 hover:text-orange-500 border py-2 px-4 rounded-md"
          >
            Login / Register
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none flex flex-col justify-center items-center"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <span className="block text-3xl font-bold">&times;</span>
            ) : (
              <span className="block text-3xl font-bold">&#9776;</span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg">
          <ul className="list-none flex flex-col gap-4 p-4 text-center">
            <li>
              <Link href="/statistic" className="hover:text-orange-500">
                Statistic
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-orange-500">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
