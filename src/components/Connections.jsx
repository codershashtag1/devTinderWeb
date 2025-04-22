import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { setConnection } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)

  const handleConnections = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(setConnection(res.data.data))
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
    }
  } 

  useEffect(() => {
    handleConnections()
  }, []);

  if(connections && connections.length === 0) {
    return (
      <div className="flex justify-center items-center my-10">
        <h1 className="text-2xl font-bold text-gray-500">No Connections</h1>
      </div>
    )
  }

  return (
    <div className='text-center my-10 px-4'>
      <h1 className='font-bold text-white text-4xl mb-8'>Connections</h1>
      {connections && connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } = connection;

        return (
          <div 
            key={_id} 
            className='flex flex-col sm:flex-row items-center sm:items-start m-4 p-6 rounded-2xl bg-base-300 w-full sm:w-3/5 mx-auto shadow-md hover:shadow-xl transition-shadow duration-300 space-y-4 sm:space-y-0 sm:space-x-6'
          >
            <img 
              src={photoUrl} 
              alt={`${firstName}'s profile`} 
              className='h-24 w-24 rounded-full object-cover border-2 border-gray-300'
            />

            <div className='text-left'>
              <h2 className='text-2xl font-semibold text-white'>{firstName} {lastName}</h2>
              {age && gender && (
                <p className='text-sm text-gray-400 mt-1'>{`${age}, ${gender}`}</p>
              )}
              <p className='text-gray-300 mt-2'>
                {about}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections