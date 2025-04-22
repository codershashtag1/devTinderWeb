import React from 'react'
import UserCard from './UserCard'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector(store => store.feed)
  console.log(feed)

  const handeFeeds = async () => {
    try {
      if (feed) return;
      let res = await axios(`${BASE_URL}/user/feed`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(addFeed(res.data))
      }
    } catch (error) {
      console.error('Error fetching feeds:', error)
    }
  }

  useEffect(() => {
    handeFeeds()
  }, [])

  if(feed && feed.length === 0) {
    return (
      <div className="flex justify-center items-center my-10">
        <h1 className="text-2xl font-bold text-gray-500">No User Available</h1>
      </div>
    )
  }

  return (
    feed && (
      <div className="flex justify-center items-center my-10">
        <UserCard user= {feed[0]} />
      </div>
    )
  )
}

export default Feed