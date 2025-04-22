import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setRequests, removeRequests } from '../utils/requestsSlice';


const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests)

  const handleRquestStatus = async (status, id) => {  
    try {
      let res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {}, { withCredentials: true })
      if (res.status === 200) {
        dispatch(removeRequests(id))
      }
    } catch (error) {
      console.error('Error updating request status:', error)
    }
  }

  const handleRequests = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(setRequests(res.data))
      }

    } catch (error) { 
      console.error('Error fetching requests:', error)
    }
  }

  useEffect(() => {
    handleRequests()
  }, []);

  if(requests && requests.length === 0) {
    return (
      <div className="flex justify-center items-center my-10">
        <h1 className="text-2xl font-bold text-gray-500">No Requests Found</h1>
      </div>
    )
  }


  return (
    <div className='text-center my-10 px-4'>
      <h1 className='font-bold text-white text-4xl mb-8'>Requests</h1>
      {requests && requests.map((req) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } = req.fromUserId;
        return (
          <div 
            key={_id} 
            className='flex flex-col sm:flex-row sm:items-center m-4 p-6 rounded-2xl bg-base-300 w-full sm:w-3/5 mx-auto shadow-md hover:shadow-xl transition-shadow duration-300 space-y-4 sm:space-y-0 sm:space-x-6'
          >
            <img 
              src={photoUrl} 
              alt={`${firstName}'s profile`} 
              className='h-24 w-24 rounded-full object-cover border-2 border-gray-300'
            />

            <div className='text-left flex-grow'>
              <h2 className='text-2xl font-semibold text-white'>{firstName} {lastName}</h2>
              {age && gender && (
                <p className='text-sm text-gray-400 mt-1'>{`${age}, ${gender}`}</p>
              )}
              <p className='text-gray-300 mt-2'>
                {about}
              </p>
            </div>

            <div className='flex space-x-4 ml-auto'>
              <button className='btn bg-violet-600 hover:bg-violet-700 text-white' onClick={() => handleRquestStatus('accepted', req._id)}>Accept</button>
              <button className='btn bg-pink-500 hover:bg-pink-600 text-white' onClick={() => handleRquestStatus('rejected', req._id)}>Reject</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests