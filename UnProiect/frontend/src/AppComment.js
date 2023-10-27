import React, { useState, useEffect } from 'react';
import "./ProductPage.css"
import UserContext from './UserContext';
import ProductPage from './ProductPage';

const AppComment = () => {
  const [currentUser, setCurrentUser] = useState(null); // Set the initial state to null

  useEffect(() => {
    // Make a request to your /users endpoint with the email or username of the current user
    const emailOrUsername = "pppppp"; // Replace with the email or username of the current user
    fetch(`/users?username=${emailOrUsername}`)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setCurrentUser(data.user); // Set the currentUser state to the user data returned from the server
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <ProductPage />
    </UserContext.Provider>
  );
};

export default AppComment;