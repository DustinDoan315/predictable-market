"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Notifications, Search, ArrowDropDown } from "@mui/icons-material";

export default function HeaderBar() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white py-3 px-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Image src="/vercel.svg" alt="Brand Logo" width={32} height={32} />
          <span className="text-xl font-semibold">Polymarket</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-lg px-4 py-1 max-w-sm w-full mx-2">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search markets"
            className="bg-transparent text-sm text-white focus:outline-none w-full"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/markets" className="text-gray-400 hover:text-white">
            Markets
          </Link>
          <Link href="/dashboards" className="text-gray-400 hover:text-white">
            Dashboards
          </Link>
          <Link href="/activity" className="text-gray-400 hover:text-white">
            Activity
          </Link>
          <div className="flex items-center space-x-1">
            <span className="text-green-400">$0.00</span>
            <span className="text-gray-400">Cash</span>
          </div>
        </nav>

        {/* Deposit Button */}
        <button className="hidden md:block bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md font-medium">
          Deposit
        </button>

        {/* Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <Notifications className="text-gray-400 cursor-pointer" />
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500" />
              <ArrowDropDown className="text-gray-400" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 hover:bg-gray-100">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
