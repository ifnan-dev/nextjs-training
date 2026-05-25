"use client";
import { useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-blue-600">
              FreelanceHub
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/skills" className="text-gray-700 hover:text-blue-600">
              Skills
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/jobs" className="text-gray-700 hover:text-blue-600">
              Jobs
            </a>
          </div>

          {loggedIn ? (
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Dashboard
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <a
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Log in
              </a>
                <a
                  href="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Register
                </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
