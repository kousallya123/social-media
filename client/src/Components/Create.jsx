import { Box, Button, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Arrow from '../assets/arrow.png'
import Upload from '../assets/upload.png'
import axios from 'axios';


function Create({x,setX}) {


  
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  
    // Create a preview URL for the selected file
    const preview = selectedFile ? URL.createObjectURL(selectedFile) : null;
    setImagePreview(preview);
  };
  const user=JSON.parse(localStorage.getItem('user'))
  const [desc,setDesc]=useState('')
  const [error,setError]=useState('')
  const handleUpload = async () => {
    setError('');
    if (!file) {
      setError('Please select a file');
      console.log('Please select a file');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const newPost = {
        userId: user._id,
        desc: desc,
        img: file.name,
      };
      console.log(newPost);
      formData.append('newPost', JSON.stringify(newPost));
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}post/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

  
        console.log('File upload successful:', response.data);
        if (response.data) {
          setX(!x)
          setError('');
          setDesc('')
          setFile('');
          setImagePreview('');
          setModal(false)
        }
      } catch (error) {
        console.error('File upload failed:', error);
      }
    } catch (error) {
      console.error('File upload failed:', error.message);
    }
  };
  
  const [modal,setModal]=useState(false)
  
  

    return (
        <Box
            mt="0.5rem"
            p="0.5rem"
            borderRadius="1rem"
            boxShadow="0 0 0.5rem rgba(0, 0, 0, 0.1)"
            display="flex"
            height="20rem"
            justifyContent="space-between"
        >
            <Flex alignSelf="end" display={{sm:"none",md:"none",lg:"block"}}>
                <Flex m="0.5rem" bg="#C08C5D1A" align="center" justify="center" borderRadius="1.8rem" h="6rem" w="6rem">
                    <Box border="8px solid white" bg="#C08C5D1A" borderRadius="1.8rem" h="5rem" w="5rem">
                    </Box>
                </Flex>
            </Flex><Flex alignSelf="center"  display={{sm:"none",md:"none",lg:"block"}}>
                <Image src={Arrow} w="15rem" />
            </Flex>
            <Flex alignSelf="center" >
                {/* <Box borderTop="1px solid #CF796C" borderRadius="2.5rem">
                    <Box  borderTop="1px solid #CF796C" m="0.5rem" p="0.5rem" borderRadius="2rem"> */}
        <div>
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />

       
        <Button
          w="30vw"
          _hover={{
            bg: '#C08C5D',
          }}
          fontFamily="poppins"
          fontWeight={600}
          fontSize={{ sm: '0.8rem', md: '0.9rem', lg: '1rem', xl: '1rem', '2xl': '1rem' }}
          height="3rem"
          borderRadius="1.5rem"
          bg="#C08C5D"
          color="white"
          onClick={()=>setModal(true)}
      
        >
          Upload Image
        </Button>
   <Modal isOpen={modal} onClose={()=>setModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          <Input value={desc} onChange={(e)=>setDesc(e.target.value)} fontSize={{ sm: '0.8rem', md: '0.9rem', lg: '1rem', xl: '1rem', '2xl': '1rem' }} placeholder='Share something...' />
          <Button display="flex" alignSelf="center" my="0.5rem"  bg="white" _hover={{
        bg: "#CF796C",
        color: "white"
    }} h="2rem" border="1px solid #CF796C" fontFamily="poppins" fontWeight={400} color="#CF796C" fontSize={{ sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem", '2xl': "1rem" }} onClick={() => fileInputRef.current.click()}>Choose image</Button> 

    
{imagePreview && (
        <Image
          alignSelf="center"
          m="0.5rem"
          h="5rem"
          w="5rem"
          src={imagePreview}
          alt="Preview"
          style={{ marginTop: '1rem', maxWidth: '100%' }}
        />

      ) }
<ModalFooter>
   <Flex flexDir="column"><Button
          _hover={{
            bg: '#C08C5D',
          }}
          fontFamily="poppins"
          fontWeight={600}
          fontSize={{ sm: '0.8rem', md: '0.9rem', lg: '1rem', xl: '0.9rem', '2xl': '0.9rem' }}
          borderRadius="1.5rem"
          bg="#C08C5D"
          color="white"
          onClick={handleUpload}
        >
          Upload
        </Button>
        {error && <Text mt="0.5rem" fontSize="0.7rem" color="red" fontFamily="poppins">{error}</Text>}</Flex>
   </ModalFooter>
  
     
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
                {/* </Box>
                </Box> */}

            </Flex>
            <Flex>
                <Image src={Upload} zIndex="1" />
                <Flex zIndex="0" top="3rem" position="relative" right="11rem" m="0.5rem" bg="#C08C5D1A" align="center" justify="center" borderRadius="1.8rem" h="8rem" w="8rem">
                    <Box border="8px solid white" bg="#C08C5D1A" borderRadius="1.8rem" h="7rem" w="7rem">
                    </Box>
                </Flex>
            </Flex>
        </Box>

    )
}

export default Create