import React, { useState, useEffect } from 'react';

const Comments = ({ currentUser }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  const handleDelete = (id) => {
    // Only allow the current user to delete their own comments
    const comment = comments.find((comment) => comment.id === id);
    if (comment.username === currentUser.username) {
      fetch(`/comments/${id}`, { method: 'DELETE' })
        .then(() => setComments(comments.filter((comment) => comment.id !== id)));
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.username}: {comment.comment}</p>
          {comment.username === currentUser.username && (
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;