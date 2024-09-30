
import React, { useState, useEffect } from 'react';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import axiosClient from '../../../axios-client';

export const DocumentIndex = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token);
    axiosClient.get(`http://localhost:8080/api/documents/userToken`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setDocuments(response.data);
        } else {
          setDocuments([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, []);

  return (
    <div className="pt-24 px-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Uploaded Documents</h1>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {documents.length > 0 ? (
          documents.map((item, index) => (
            <div
              className="relative h-52 w-52 overflow-hidden rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              key={index}
            >
        
              {
                item.mime_type.includes("image/") &&
                <img src={item.url} alt={`Uploaded Image ${index + 1}`} className="h-full w-full object-cover" />
              }

              {
                item.mime_type === "application/pdf" &&
                <object data={item.url} type="application/pdf" className="h-full w-full">
                  <img
                    src="https://www.science.co.il/internet/browsers/PDF-doc-256.png"
                    alt="PDF Document"
                    className="h-full w-full object-contain"
                  />
                </object>
              }

              {
                item.mime_type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                <object data={item.url} type="application/vnd.ms-excel" className="h-full w-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png"
                    alt="Excel Document"
                    className="h-full w-full object-contain"
                  />
                </object>
              }

              {
                item.mime_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                <object data={item.url} type="application/vnd.ms-word" className="h-full w-full">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/036/897/160/non_2x/ms-word-office-file-icon-free-png.png"
                    alt="Word Document"
                    className="h-full w-full object-contain"
                  />
                </object>
              }

              {
                item.mime_type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                <object data={item.url} type="application/vnd.ms-powerpoint" className="h-full w-full">
                  <img
                    src="https://www.freeiconspng.com/thumbs/ppt-icon/microsoft-powerpoint-icon-microsoft-powerpoint-2.png"
                    alt="PowerPoint Presentation"
                    className="h-full w-full object-contain"
                  />
                </object>
              }
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xl">No documents found</p>
        )}
      </div>
    </div>
  );
};








export const UploadDoc = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      setUploadStatus('Please select files to upload');
      return;
    }

    const token = localStorage.getItem('ACCESS_TOKEN');
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('name', name);
    formData.append(
      'tags',
      JSON.stringify(tags.split(',').map((tag) => ({ name: tag.trim() })))
    );

    try {
      const response = await axios.post('http://localhost:8080/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ${token}',
        },
      });

      if (response.status === 201) {
        setUploadStatus('Files uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Files upload failed.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Documents</h1>
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={`border-dashed border-2 p-6 rounded-lg text-center ${isDragActive ? 'bg-gray-200' : 'bg-gray-100'}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here...</p>
            ) : (
              <p className="text-gray-600">Drag & drop files here, or click to select them</p>
            )}
          </div>

          {files.length > 0 && (
            <ul className="mt-4 text-center text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
            <input
              type="text"
              placeholder="Document Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Upload
          </button>
          {uploadStatus && <p className="mt-4 text-center text-gray-600">{uploadStatus}</p>}
        </form>
      </div>
    </div>
  );
};

