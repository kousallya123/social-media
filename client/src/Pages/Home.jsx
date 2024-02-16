import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Create from '../Components/Create'
import { Box } from '@chakra-ui/react'
import Post from '../Components/Post'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const user=localStorage.getItem('user')
  const navigate=useNavigate()
  useEffect(() => {
    if (!user || user === undefined) {
      navigate('/login');
    }
  }, []);
  
const [posts,setPosts]=useState(null)
const [x,setX]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}post`)
        console.log(response.data);
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [x]);
  return (
    <Box mx="2rem" my="0.2rem">
        <Navbar/>
        <Create x={x} setX={setX}/>
        {posts?.map((post)=>(
 <Post post={post} setPosts={setPosts}/>
        ))}
       
    </Box>
  )
}

export default Home