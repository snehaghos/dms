import React, { useState } from 'react';
import axiosClient from '../../../axios-client';

const DocumentFilter = ({ onFilter }) => {
  const [type, setType] = useState('');
  const [tag, setTag] = useState('');
  const [userId, setUserId] = useState('');
  const [showCurrentDate, setShowCurrentDate] = useState(false);

  // by type
  const handleFilterByType = () => {
    axiosClient.get(`http://localhost:8080/api/documents/type/${type}`)
      .then(response => {
        onFilter(response.data);
      })
      .catch(error => {
        console.error('Error filtering by type:', error);
      });
  };

  // by tag
  const handleFilterByTag = () => {
    axiosClient.get(`http://localhost:8080/api/documents/tag/${tag}`)
      .then(response => {
        onFilter(response.data);
      })
      .catch(error => {
        console.error('Error filtering by tag:', error);
      });
  };



  // current date
  const handleFilterByCurrentDate = () => {
    axiosClient.get(`http://localhost:8080/api/documents/by-current-date`)
      .then(response => {
        onFilter(response.data);
      })
      .catch(error => {
        console.error('Error filtering by current date:', error);
      });
  };

  return (
    <div className="mb-5">
      <div className="flex space-x-4 mb-4">

        {/* Filter by Type */}
        <div>
          <input 
            type="text" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            placeholder="Filter by Type"
            className="px-3 py-2 border rounded"
          />
          <button 
            onClick={handleFilterByType} 
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>

        {/* Filter by Tag */}
        <div>
          <input 
            type="text" 
            value={tag} 
            onChange={(e) => setTag(e.target.value)} 
            placeholder="Filter by Tag"
            className="px-3 py-2 border rounded"
          />
          <button 
            onClick={handleFilterByTag} 
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Filter
          </button>
        </div>



        {/* Filter by Current Date */}
        <div>
          <button 
            onClick={handleFilterByCurrentDate} 
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Filter by Current Date
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentFilter;
