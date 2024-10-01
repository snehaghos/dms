import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
const ViewDocument = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
    // const handlePdfClick = () => {
    //   const iframe = document.createElement('iframe');
    //   iframe.src = url;
  
    //   // Add a loading indicator (optional)
    //   iframe.classList.add('loading');
    //   iframe.addEventListener('load', () => {
    //     iframe.classList.remove('loading');
    //   });
  
    //   iframe.style.width = '100%';
    //   iframe.style.height = '500px'; // Adjust height as needed
    //   console.log(iframe)
    //   document.body.appendChild(iframe);
    // };
    const location1 = useLocation();
     const { url } = location1.state||{};
     console.log('Child : ',url)

    useEffect(()=>{
        const iframe = document.createElement('iframe');
        iframe.src = url;
  
      // Add a loading indicator (optional)
      // iframe.classList.add('loading');
      // iframe.addEventListener('load', () => {
      //   iframe.classList.remove('loading');
      // });
  
      iframe.style.width = '100%';
      iframe.style.height = '500px'; // Adjust height as needed
      console.log(iframe)
      document.body.appendChild(iframe);
      return () => {
        document.body.removeChild(iframe);
      };
    },[url])
  
    return (
      <>
        <div>
      {iframeLoaded ? (
        <p>Iframe loaded successfully!</p>
      ) : (
        <p>Loading iframe...</p>
      )}
    </div>
      </>
    );
  };

export default ViewDocument
