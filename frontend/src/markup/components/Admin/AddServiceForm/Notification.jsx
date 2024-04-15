import React from 'react';

function Notification({ message, type }) {
  return (
    <div className={`notification ${type} `}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
