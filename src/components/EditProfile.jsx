import React from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = React.useState(user.firstName)
  const [lastName, setLastName] = React.useState(user.lastName)
  const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl)
  const [about, setAbout] = React.useState(user.about)
  const [age, setAge] = React.useState(user.age)
  const [gender, setGender] = React.useState(user.gender)
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false)
  const dispatch = useDispatch()


  const handleEditProfile = async () => {  
    try {
      setError("");
      let res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName, 
        photoUrl,
        about,  
        age,
        gender
      },{ withCredentials: true })
      if(res.status === 200) {
        if(res.data != "No Change Found") {
          dispatch(addUser(res.data))
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        } 
      }

    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  
  let { email } = user

  return (
    <div className='flex justify-center items-stretch my-10 space-x-40 min-h-[600px]'>
      <div className="card card-dash bg-base-300 w-96 h-full">
        <div className="card-body">
          <div className="flex flex-col w-full space-y-8">
            <h1 className="card-title justify-center">Edit Profile</h1>
            <label className="input validator">
              <input
                type="text"
                required
                placeholder="First Name"
                minLength="3"
                maxLength="30"
                title="Enter a valid first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
              <label className="input validator">
              <input
                type="text"
                required
                placeholder="Last Name"
                minLength="3"
                maxLength="30"
                title="Enter a valid user name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="input validator">
              <input
                type="number"
                required
                placeholder="Age"
                minLength="18"
                maxLength="100"
                title="Enter a valid age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <select
              value={gender}
              className="select select-md"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <label className="input">
              <input type="text" placeholder="URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
            </label>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="email"
                required
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$*"
                minLength="3"
                maxLength="30"
                title="Enter a valid email address"
                value={email}
                disabled={true}
              />
            </label>
            <textarea className="textarea" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
            <p className="text-red-500">{error}</p>
            <button className="btn bg-[#1A77F2] text-white border-[#005fd8]" onClick={handleEditProfile}> Edit Profile </button>
          </div>
        </div>
      </div>
      <div className="card card-dash bg-base-300 w-96 flex-shrink-0 h-full">
        <UserCard user = {{ _id: user._id, firstName, lastName, photoUrl, about, age, gender }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile