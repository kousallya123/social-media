import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {format as timeAgo} from 'timeago.js'
import { IoMdMore } from "react-icons/io";

function Comments({isReply,comment}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    return (
   <Box mx="0.5rem" mt="0.5rem"  ml={isReply ? "2rem" :"0rem"}>
           <Flex justifyContent="space-between" alignItems="center"> <Flex align="center">  <Image p="0.2rem" src={PF+comment?.userId?.profileImage} h="2.5rem" w="2.5rem" borderRadius="50%" />
                <Text fontFamily="poppins" fontWeight={500} ml="0.3rem" fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "1rem", '2xl': "1.1rem" }}>{comment?.userId?.username}</Text>
                <Text fontFamily="poppins" color="#0000004D" ml="0.3rem" fontWeight={400} fontSize={{ sm: "0.6rem", md: "0.6rem", lg: "0.6rem", xl: "0.6rem", '2xl': "0.6rem" }}>{timeAgo(comment?.createdAt)}</Text></Flex>
                <IoMdMore />  </Flex> 
                <Box  p="0.5rem"fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem", '2xl': "0.9rem" }} fontFamily="poppins" bg="#ECC8AE4D" borderBottomRadius="1rem" borderTopEndRadius="1rem"> 
          {comment?.comment}
          </Box>
        </Box>
         
    )
}

export default Comments