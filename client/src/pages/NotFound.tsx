import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <video src="/Animation - 1751105008890.webm" className="w-72 h-72 mb-4" autoPlay loop muted playsInline />
      <h1 className="text-7xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-8 text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
