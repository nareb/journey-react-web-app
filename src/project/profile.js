import React, { useState } from "react";

function Profile() {
  const [profileImage, setProfileImage] = useState(""); // State to store the selected image URL

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div>
      <h1>This is Profile Page</h1>
      
      {/* Display the profile image with an option to upload a new one */}
      <img
        src={profileImage || "https://via.placeholder.com/150"}
        alt="Profile"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      
      {/* Input for uploading a new image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ margin: "10px 0" }}
      />

      {/* Add other profile information and content here */}
    </div>
  );
}
export default Profile;