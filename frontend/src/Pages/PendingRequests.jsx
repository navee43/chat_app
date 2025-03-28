import React from 'react';
import { useGetPendingRequestsQuery, useAcceptRequestMutation, useRejectRequestMutation } from '../redux/api/user.apiSlice.js';
import { useSelector } from 'react-redux';

const PendingRequests = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const { data: requests, error, isLoading } = useGetPendingRequestsQuery(userInfo.data.user._id);
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();
  
  // console.log("userinfo is " , userInfo.data.user._id)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching requests.</p>;

  const handleAccept = async (requestId) => {
    await acceptRequest(requestId);
  };

  const handleReject = async (requestId) => {
    await rejectRequest(requestId);
  };

  return (
    <div>
      <h3>Pending Chat Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              {req.sender.username} ({req.sender.email})
              <button onClick={() => handleAccept(req._id)} className='p-2 bg-green-500 m-10'>Accept</button>
              <button onClick={() => handleReject(req._id)} className='p-2 bg-red-500 '>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingRequests;
