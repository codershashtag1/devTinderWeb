import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, age, photoUrl, about, skills } = user
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => { 
    try {
      let res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true })
      if (res.status === 200) {
        console.log(res.data)
        dispatch(removeUserFromFeed(user._id))
      }

    } catch (error) { 
      console.error('Error sending request:', error)
    } 
  }

  return (
    user && (
      <div className="card bg-base-300 w-96 shadow-sm h-full flex flex-col">
        <figure className="h-95 overflow-hidden">
          <img
            src={photoUrl}
            alt="profileImage" 
            className="object-cover w-full h-full"/>
        </figure>
        <div className="card-body">
          <h1 className="card-title"><u>{firstName} {lastName}</u></h1>
          { age && gender && <p>{age} year, {gender}</p> }
          <p>{about}</p>
          {/* <p><b>Skills : </b>{skills.join(', ')}</p> */}
          <div className="card-actions justify-center my-6 space-x-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest('ignored', _id)}>Ignored</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
          </div>
        </div>
      </div>
    )
  )
}

export default UserCard