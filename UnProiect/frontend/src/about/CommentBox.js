import React, { useState } from 'react';

const CommentBox = ({ currentUser, productId }) => {
    const [comment, setComment] = useState('');
  
    const handleChange = (event) => {
      if (event.target.value.length <= 1000) {
        setComment(event.target.value);
      }
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentUser && currentUser.username) { // Check if currentUser is defined and has a username property
          const { username } = currentUser;
          console.log(`Adding comment from ${username} with productId ${productId}`);
          const timestamp = new Date().toISOString();
          // Send the comment to the server with the current user's information
          fetch('/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, comment, timestamp, productId }),
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(`Added comment with id ${data.id}`);
            // Clear the comment box
            setComment('');
          });
        }
      };
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={handleChange} />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentBox;