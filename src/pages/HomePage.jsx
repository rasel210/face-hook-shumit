import React from 'react'
import useAuth from '../components/hooks/useAuth'
import { Link } from 'react-router-dom';

function HomePage() {

  const { auth } = useAuth();
  console.log(auth);

  return (
    <div>
      <p>Home page</p>
      <Link to='/profile'>Go to Profile</Link>
    </div>
  )
}

export default HomePage