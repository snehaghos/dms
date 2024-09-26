import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentIndex = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/documents')
      .then(response => {
        console.log('Fetched documents:', response.data);
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, []);
  
  

  return (
    <div>
      <h1>Uploaded Documents</h1>
      <ul>
        {Array.isArray(documents) ? (
          documents.map((document) => (
            <li key={document.id}>
              <a  target="_blank" >
                {document.name}
                <img src={document.url} alt="" />
              </a> 
              {/* Uploaded on {new Date(document.createdAt).toLocaleDateString()} */}
            </li>
          ))
        ) : (
          <li>No documents available</li>
        )}
      </ul>
    </div>
  );
  
};

export default DocumentIndex;
