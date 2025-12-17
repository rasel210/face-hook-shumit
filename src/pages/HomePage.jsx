import React from 'react'
import useAuth from '../components/hooks/useAuth'

function HomePage() {

  const { auth } = useAuth();
  console.log(auth);

  return (
    <div>
      <p>Home page</p>
    </div>
  )
}

export default HomePage