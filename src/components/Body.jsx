import React from 'react'
import Navbar from './Navbar' 
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'  
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(store => store.user)

  const handleUser = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(addUser(res.data))
      }
      //  else if(res.status === 401) {
      //   res.send('Please Login')
      //   return navigate('/login')
      // }

    } catch (error) {
      if(error.response.status === 401) {
        return navigate('/login')
      }
      console.error('Error during login:', error)
    }
  }

  useEffect(() => {
    if(!user) {
      handleUser();
    }
  }, [])  


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body