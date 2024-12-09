import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const DocHome = () => {
  const navigate = useNavigate();

  const handleSeeAllDocuments = () => {
    navigate('/docs');
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
          Document Management System
        </h1>
        <p className="mb-10 text-lg text-gray-600">Manage your documents effortlessly</p>
        <div className="flex space-x-8">
          <button
            onClick={handleSeeAllDocuments}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            See All Documents
          </button>
          <button
            onClick={handleUpload}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default DocHome;
