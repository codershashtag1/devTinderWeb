import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showEmailHint, setShowUsernameHint] = useState(false)
  const [showPasswordHint, setShowPasswordHint] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Check native validity
    if (emailRef.current && !emailRef.current.validity.valid) {
      setShowUsernameHint(true)
    } else {
      setShowUsernameHint(false)
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)

    // Check native validity
    if (passwordRef.current && !passwordRef.current.validity.valid) {
      setShowPasswordHint(true)
    } else {
      setShowPasswordHint(false)
    }
  }

  const handleLogin = async () => {
    // Check native validity
    try {
      if (emailRef.current && passwordRef.current) {
        if (emailRef.current.validity.valid && passwordRef.current.validity.valid) {
          let res = await axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true })
          dispatch(addUser(res.data))
          return navigate('/')
        } else {
          setShowUsernameHint(true)
          setShowPasswordHint(true)
        }
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const handleSignUp = async () => {  
    try {
      let res = await axios.post(`${BASE_URL}/auth/signUp`, {
        firstName,
        lastName,
        email,
        password
      }, { withCredentials: true })

      if (res.status === 200) {  
        dispatch(addUser(res.data))
        navigate('/profile')
      }
    } catch(error) {
      console.error('Error during signup:', error)
    }
  }

  return (
    <div className='flex justify-center items-center my-20'>
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <div className="flex flex-col w-full space-y-8">
            <h1 className="card-title justify-center">{isLoggedIn ? "Login" : "Sign Up"}</h1>
            {!isLoggedIn && (
              <>
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
                    title="Enter a valid last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
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
                onChange={handleEmailChange}
                ref={emailRef}
              />
            </label>
            {showEmailHint && (
              <p className="validator-hint">
                Must be 3 to 30 characters
                <br />containing only letters, numbers or dash
              </p>
            )}
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={handlePasswordChange}
                ref={passwordRef}
              />  
            </label>
            { showPasswordHint && (
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
              </p>
            )}
            <button className="btn bg-[#1A77F2] text-white border-[#005fd8]" onClick={isLoggedIn ? handleLogin : handleSignUp}>{isLoggedIn ? "Login" : "SignUp"} </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login