import React, { useState } from 'react';
import { useSendChatRequestMutation } from '../redux/api/user.apiSlice.js';
import OnlineUsers from '../Pages/OnlineUsers.jsx';

const SendRequest = () => {
  const [message, setMessage] = useState('');
  const [sendChatRequest, { isLoading, error }] = useSendChatRequestMutation();

  const sendRequest = async (receiverId) => {
    try {
        const response = await sendChatRequest({ receiverId }).unwrap();
      setMessage('Request sent successfully!');
    } catch (err) {
      setMessage(err?.data?.message || 'Error sending request');
    }
  };

  
  return (
    <div>
      <OnlineUsers onSelectUser={sendRequest} />
      {isLoading && <p>Sending request...</p>}
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.data?.message || 'Failed to send request'}</p>}
    </div>
  );
};

export default SendRequest;
