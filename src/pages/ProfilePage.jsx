import React, { useEffect, useState } from 'react'
import useAxios from '../components/hooks/useAxios';
import useAuth from '../components/hooks/useAuth';

function ProfilePage() {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);

      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [])

  if (loading) {
    return <div>Fetching your profile data...</div>
  }


  return (
    <div>{user?.firstName} {' '} {user?.lastName}</div>
  )
}

export default ProfilePage;