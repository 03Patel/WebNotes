import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Scalable Notes App</h1>
        <p className="text-gray-700 mb-6">
          Manage your notes efficiently. Sign up or log in to get started.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
