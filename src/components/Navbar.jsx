import React from 'react';
import { useSelector, useDispatch } from 'react-redux';    
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import { clearRequests } from '../utils/requestsSlice';
import { removeConnection } from '../utils/connectionSlice';


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser())
      dispatch(removeFeed())
      dispatch(clearRequests())
      dispatch(removeConnection())
      return navigate('/login')

    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && (
          <div className="flex-none gap-2 mx-2">
            <div className='flex items-center'>
              <div>Welcome {user.firstName}</div>
              <div className="dropdown dropdown-end mx-5 flex">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl} />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
                  <li><Link to='/profile'>Profile</Link></li>
                  <li><Link to='/connections'>Connection</Link></li>
                  <li><Link to='/requests'>Requests</Link></li>
                  <li><a onClick={handleLogout}>Logout</a></li> 
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Navbar;