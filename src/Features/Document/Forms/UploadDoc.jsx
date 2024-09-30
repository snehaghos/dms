import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import axiosClient from '../../../axios-client';

const UploadDoc = () => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles([...files, ...acceptedFiles]);

      const previews = acceptedFiles.map((file) =>
        file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      );
      setFilePreviews([...filePreviews, ...previews]);
    }
  }, [files, filePreviews]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      setUploadStatus('Please select files to upload');
      return;
    }

    const token = localStorage.getItem('ACCESS_TOKEN');
    const formData = new FormData();

  
    files.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('name', name);
    formData.append('tags', tags);

    try {
      const response = await axiosClient.post('http://localhost:8080/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setUploadStatus('Files uploaded successfully!');
        setFiles([]);
        setFilePreviews([]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('File upload failed.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Documents</h1>
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={`border-dashed border-2 p-6 rounded-lg text-center ${
              isDragActive ? 'bg-gray-200' : 'bg-gray-100'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here...</p>
            ) : (
              <p className="text-gray-600">Drag & drop files here, or click to select files</p>
            )}
          </div>

          {files.length > 0 && (
            <ul className="mt-4 text-center text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}

          {filePreviews.length > 0 && (
            <div className="mt-4 flex gap-2 w-full">
              {filePreviews.map((preview, index) =>
                preview ? <img key={index} src={preview} alt="Preview" className="w-28 h-auto rounded-md" /> : null
              )}
            </div>
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

export default UploadDoc;
