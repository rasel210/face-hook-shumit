import React from 'react'
import useAuth from '../components/hooks/useAuth'
import { Navigate, Outlet, } from 'react-router-dom';
import Headers from '../common/Headers';
import ProfileProvider from '../provider/ProfileProvider';


function PrivateRoutes() {

  const { auth } = useAuth();

  return (
    <>
      {
        auth.authToken ? (
          <>
            <ProfileProvider>
              <Headers />
              <main className="mx-auto max-w-[1020px] py-8">
                <div className='container'>
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>

          </>
        ) : (
          <Navigate to="/login" />
        )

      }
    </>
  )
}

export default PrivateRoutes;