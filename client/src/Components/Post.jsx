import { Box, Button, Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { format as timeAgo } from 'timeago.js'
import Profile from '../assets/profile.jfif'
import Comments from './Comments'
import { IoMdSend } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios'

function Post({ post, setPosts }) {
    console.log(post);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const liked = post?.likes
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = JSON.parse(localStorage.getItem('user'))

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handleCommentButtonClick = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };
    const [comments,setComments]=useState(null)
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_URL}post/getcomment/${post._id}`)
              console.log(response.data);
              setComments(response.data)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
    },[])
    return (
        <>
            <Box
                mt="1rem"
                borderRadius="1rem"
                boxShadow="0 0 0.5rem rgba(0, 0, 0, 0.1)"
                p="0.5rem"
                justifyContent="space-between"
            >
                <ProfileSmall post={post} PF={PF} />
                <Text opacity="60%" my="0.5rem" fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "1rem", '2xl': "1.1rem" }} fontWeight={400} fontFamily="poppins" lineHeight="1.1rem">{post?.desc}</Text>
                <Image src={PF + post?.img} cursor="pointer" onClick={onOpen} />

                <Flex justify="space-between">
                    <Text
                        fontSize={{
                            base: "0.5rem",
                            sm: "0.6rem",
                            md: "0.7rem",
                            lg: "0.8rem",
                        }}
                        display="flex"
                        alignItems="center"
                        my="0.5rem"
                        fontFamily="poppins"
                        color="rgba(0,0,0,0.6)"
                    >
                        {liked?.length === 0 ? (
                            "No Likes"
                        ) : liked?.length <= 3 ? (
                            <Flex position={"relative"} mr="0.4rem">
                                {liked?.map((detail, idx) => (
                                    <Image
                                        src={PF + detail?.profileImage}
                                        h="2rem"
                                        w="2rem"
                                        borderRadius="1rem"
                                        ml={`${idx * -0.5}rem`}
                                    />
                                ))}
                            </Flex>
                        ) : (
                            <Flex position={"relative"} mr="0.4rem">
                                {liked
                                    ?.slice(0, 2)
                                    .map((detail, idx) => (
                                        <Image
                                            alt="profile"
                                            key={idx}
                                            borderRadius={"50%"}
                                            position="absolute"
                                            h="2rem"
                                            w="2rem"
                                            left={`${idx * 1.3}rem`}
                                            src={PF + detail?.profileImage}
                                        />
                                    ))
                                }
                                <Box
                                    position={"relative"}
                                    left="0.5rem"
                                    ml="2rem"
                                >
                                    <svg
                                        width="32"
                                        height="33"
                                        viewBox="0 0 32 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M30.8959 16.0549C30.8959 24.651 24.1486 31.5913 15.8596 31.5913C7.57054 31.5913 0.823183 24.651 0.823183 16.0549C0.823183 7.45879 7.57054 0.518496 15.8596 0.518496C24.1486 0.518496 30.8959 7.45879 30.8959 16.0549Z"
                                            fill="#CFCFCF"
                                            stroke="#C1F1FD"
                                            strokeWidth="1.03699"
                                        />
                                    </svg>
                                    <Text
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform={"translate(-50%,-50%)"}
                                        fontFamily={"poppins"}
                                        fontWeight={500}
                                        fontSize={{ base: "0.8rem" }}
                                    >
                                        +{liked?.length - 2}
                                    </Text>
                                </Box>
                            </Flex>
                        )}
                    </Text>
                    <Text fontSize={{
                        base: "0.5rem",
                        sm: "0.6rem",
                        md: "0.7rem",
                        lg: "0.8rem",
                    }}
                        display="flex"
                        alignItems="center"
                        my="0.5rem"
                        fontFamily="poppins"
                        color="rgba(0,0,0,0.6)">
                        {comments?.length} comments
                    </Text>
                </Flex>
                <LikeAndComment setPosts={setPosts} liked={liked} user={user} post={post} handleCommentButtonClick={handleCommentButtonClick}
                    isAccordionOpen={isAccordionOpen} />
           <CommentComponent post={post} user={user} PF={PF} comments={comments} setComments={setComments}/>


            </Box>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody m="0.8rem">
                        <Flex w="100%">
                            <Image w="50%" src={PF + post?.img} />
                            <Box ml="0.5rem" w="50%">
                                <Box>
                                    <ProfileSmall post={post} PF={PF} />
                                    <LikeAndComment setPosts={setPosts} liked={liked} user={user} isModal={true} post={post} />
                                </Box>
                                <CommentComponent post={post} user={user} PF={PF} comments={comments} setComments={setComments}/>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const CommentComponent=({post,user,PF,comments,setComments})=>{

    const [comment,setComment]=useState('')

        const handleComment=async()=>{
            if(comment===''){
                alert('comment is empty')
            }else{
                const response= await axios.post(`${process.env.REACT_APP_URL}post/addcomment/${post._id}`,
                {userId:user._id,comment:comment,postId:post._id})
                console.log(response.data.succes,'aaaaaaaaaaaaaaaaaaaaaaaaaaa');
            
                if(response.data.succes===true){
                
                    const Currentuser={
            profileImage: user.profileImage,
            username: user.username,
            _id:response.data.data.userId
                    }
                    const newComment ={... response.data.data,userId:Currentuser}
                    setComments((prevComments) => [...prevComments, newComment]);
                    setComment("")
                }
            }
       
         }
 
    
    return(
        <Box my="0.5rem" p="0.7rem" bg="#E1E1E133" borderRadius="1rem">
            <Box    sx={{
                    marginTop: "0.5rem",
                    height: "250px",
                    minHeight:"200x",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#CF796C",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#ECC8AE4D",
                    },
                  }}>
        {comments?.map((c) => (
            <Comments isReply={c.isReply} comment={c} />
        ))}
        </Box>

            <InputGroup mt="1rem" size="md" bg="transparent" borderRadius="1.5rem">
                <InputLeftElement
                    pointerEvents="none"
                    children={
                        <Image
                            src={PF + user?.profileImage}
                            h="2rem"
                            w="2rem"
                            alt="icon"
                            borderRadius="50%"
                        />
                    }
                />
                <Input
                    bg="#ECC8AE4D"
                    pr="4.5rem"
                    type="text"
                    fontFamily="poppins"
                    _placeholder={{
                        opacity: "30%"
                    }}
                    fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem", '2xl': "1rem" }}
                    placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <InputRightElement>
                    <IoMdSend size="20px" color="#CF796C"  onClick={handleComment}/>
                </InputRightElement>
            </InputGroup>
    </Box>

    )
}


const ProfileSmall = ({ post, PF }) => (
    <Flex align="center" justify="space-between" w="100%">
        <Flex align="center">  <Image border="2px solid #C08C5D" p="0.2rem" src={PF + post?.userId?.profileImage} h="3rem" w="3rem" borderRadius="50%" />
            <Box ml="0.4rem">
                <Text fontFamily="poppins" fontWeight={500} fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem" }}>{post?.userId?.username}</Text>
                <Text fontFamily="poppins" color="#0000004D" fontWeight={400} fontSize={{ sm: "0.6rem", md: "0.7rem", lg: "0.7rem", xl: "0.7rem" }}>{timeAgo(post?.createdAt)}</Text>
            </Box></Flex>
        <Button bg="white" _hover={{
            bg: "#CF796C",
            color: "white"
        }} h="2rem" border="1px solid #CF796C" fontFamily="poppins" fontWeight={400} color="#CF796C" fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem" }}>
            Report
        </Button>
    </Flex>
)


const LikeAndComment = (props) => {
    const { post, user, setPosts, handleCommentButtonClick, isAccordionOpen } = props


    const isUserLiked = post?.likes?.some(item => item._id === user._id);
    const handleLike = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}post/like/${post._id} `, { userId: user._id })
            if (response.data.data === 'liked') {
                const updatedLikes = { _id: user._id, email: user.email, profileImage: user.profileImage, username: user.username };
                console.log(updatedLikes)
                setPosts((prev) => {
                    const updatedPosts = prev.map((p) => {
                        if (p._id === post._id) {
                            return { ...p, likes: [...p.likes, updatedLikes] };
                        }
                        return p;
                    });

                    return updatedPosts;
                });

            } else if (response.data.data === 'unliked') {
                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.id === post.id) {
                            return {
                                ...p,
                                likes: p.likes.filter((like) => like._id !== user._id),
                            };
                        }
                        return p;
                    })
                );
            }

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Flex w="100%" mt="0.5rem">
                <Button
                    w="50%"
                    onClick={handleLike}
                    _hover={{
                        bg: "white",
                    }}
                    border="1px solid #CF796C"
                    fontFamily="poppins"
                    fontWeight={600}
                    fontSize={{
                        sm: props.isModal ? "0.7rem" : "0.8rem",
                        md: props.isModal ? "0.8rem" : "0.9rem",
                        lg: props.isModal ? "0.8rem" : "1rem",
                        xl: props.isModal ? "0.9rem" : "1.1rem",
                        '2xl': props.isModal ? "1rem" : "1.2rem"
                    }}
                    borderRadius="1.5rem"
                    bg="white"
                    color="#CF796C"
                >
                    {isUserLiked && (
                        <>
                            <FaHeart size="16px" color='#CF796C' style={{ marginRight: "0.2rem" }} /> Liked
                        </>
                    )}
                    {!isUserLiked && (
                        <>
                            <FaRegHeart size="16px" color='#CF796C' style={{ marginRight: "0.2rem" }} /> Like
                        </>
                    )}
                </Button>

                <Button ml="0.5rem" w="50%" _hover={{
                    bg: "#CF796C",
                }} fontFamily="poppins" fontWeight={600} fontSize={{
                    sm: props.isModal ? "0.7rem" : "0.8rem",
                    md: props.isModal ? "0.8rem" : "0.9rem",
                    lg: props.isModal ? "0.8rem" : "1rem",
                    xl: props.isModal ? "0.9rem" : "1.1rem",
                    '2xl': props.isModal ? "1rem" : "1.2rem"
                }} onClick={handleCommentButtonClick} borderRadius="1.5rem" bg="#CF796C" color="white">
                    Comment
                </Button>
            </Flex>

        </>
    )
}

export default Post