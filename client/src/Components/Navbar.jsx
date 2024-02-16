import { Flex, Input, InputGroup, Image,Box, InputRightElement, Button } from '@chakra-ui/react'
import React from 'react'
import Logo from '../assets/logo.png'
import { FaSearch } from "react-icons/fa";
import Profile from '../assets/profile.jfif'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const user=JSON.parse(localStorage.getItem('user'))
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
const navigate=useNavigate()
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      localStorage.removeItem('user');
      navigate('/login')
    }
  };
  return (
    <Flex justifyContent="space-between"  alignItems="center">
        <Image src={Logo}  h="7rem" w="4rem" />
        <Box display="flex" ml="0.5rem"> 
            <InputGroup bg="#F3F3F3" color="#DDDDDD" fontSize="16px" borderRadius="full">
               <Input placeholder='Search...' fontSize={{sm:"0.6rem",md:"0.7rem",lg:"0.8rem",xl:"0.9rem",'2xl':"1rem"}}/>
               <InputRightElement >
               <FaSearch/>
               </InputRightElement>
            </InputGroup>
            <Button w="15rem" ml="0.5rem" fontSize={{sm:"0.6rem",md:"0.7rem",lg:"0.8rem",xl:"0.9rem",'2xl':"1rem"}} _hover={{
                bg:"#E7AD99"
            }} bg="#E7AD99" pl="1.5rem"  borderRadius="1.5rem"fontWeight={400} color="#FFFFFF" fontFamily="poppins">

                <Image position="absolute"left="0rem"  borderRadius="50%" h="100%" w="2.5rem" src={PF+user?.profileImage}/>
                  {user?.username}
            </Button>
            <Button  onClick={handleLogout} fontSize={{sm:"0.6rem",md:"0.7rem",lg:"0.8rem",xl:"0.9rem",'2xl':"0.9rem"}} ml="0.5rem" _hover={{
                bg:"#E7AD99"
            }} bg="#E7AD99" py="1rem" borderRadius="1.5rem"fontWeight={400} color="#FFFFFF" fontFamily="poppins">
             Logout
            </Button>
        </Box>
    </Flex>
  )
}

export default Navbar