import React, {} from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { USER_LOADED, AUTH_ERROR } from '../../redux/types'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import { useState } from 'react'
//import  StaffDetails  from './../staff/staffListing'
const Home = ({history}) => {
  
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  useEffect(() => {
    if(localStorage.token)
      loadUsers();
    else
      history.push('/login');
    // eslint-disable-next-line
  }, []);
  
  const loadUsers = async () =>{ 
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('https://icrm-server.herokuapp.com/api/auth/me');
        setUsername(res.data.data.name);
        dispatch({type: USER_LOADED, payload: res.data});
      } catch (err) {
        console.log(err);
        dispatch({type: AUTH_ERROR, payload: err.message}); 
      }
  }

  return (
    <div>    
          <h1>Hi {username}! Welcome to iCrm Application</h1>
          
    </div>
  )
}

export default Home
