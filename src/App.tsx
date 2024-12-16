import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Create a video element to preview the camera feed
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        // Append the video element to the DOM temporarily
        document.body.appendChild(videoElement);

        setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;

          // Draw the video frame on the canvas
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          }

          // Capture the frame as an image
          const capturedImage = canvas.toDataURL('image/png');
          setImage(capturedImage);

          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop());

          // Remove the video element from the DOM
          document.body.removeChild(videoElement);
        }, 10000); // Capture after 3 seconds
      } else {
        alert('Camera not supported on this device.');
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  return (
    <div className="main">
      <div className="hello">Hello</div>
      <button onClick={handleOpenCamera} className="camera-button">
        Open Camera
      </button>
      {image && (
        <div className="preview">
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" className="captured-image" />
        </div>
      )}
    </div>
  );
};

export default App;
