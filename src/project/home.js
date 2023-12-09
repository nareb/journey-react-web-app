import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePostStatus = () => {
    // Implement the logic to post the status here
    console.log('Posted status:', status);
    // Clear the status input after posting
    setStatus('');
  };

  return (
    <div>
      <h1>Home Page</h1>

      {/* Status input */}
      <textarea
        placeholder="What's on your mind?"
        value={status}
        onChange={handleStatusChange}
      />

      {/* Post button */}
      <button onClick={handlePostStatus}>Post</button>

      {/* Display the status */}
      {status && (
        <div>
          <h2>Your Status:</h2>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default Home;