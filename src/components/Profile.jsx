import React from 'react'
import EditProfile from './EditProfile'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'

export const Profile = () => {
  const user = useSelector(store => store.user)
  
  return (
    user && (
      <div>
        <EditProfile user = {user}/>
      </div>
    )
  )
}
