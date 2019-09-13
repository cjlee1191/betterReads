import React from 'react';
import { Redirect } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('jwt');
  return <Redirect to='/home' />
}

export default Logout;