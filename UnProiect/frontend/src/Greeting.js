import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Greeting() {
  const { isAuthenticated, user } = useContext(AuthContext);
  console.log('isAuthenticated:', isAuthenticated); // add console.log here
  console.log('user:', user); // add console.log here
  let username = "";
  if (isAuthenticated && user) {
    const atIndex = user.emailOrUsername.indexOf("@");
    if (atIndex > -1) {
      username = user.emailOrUsername.substring(0, atIndex);
    } else {
      username = user.emailOrUsername;
    }
  }
  
  return (
    <div>
      {isAuthenticated ? <p>Bună, {username}</p> : <p>Bună, oaspete</p>}
    </div>
  );
}

export default Greeting;
