import { Button, Flex, Heading, Input, Image, Box, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Logo from '../assets/logo.png'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      });
const [image,setImage]=useState('')
      const navigate=useNavigate()
    const handleRegister = async (values, { setSubmitting }) => {
        const {name,email,password}=values
        try {
            const formData = new FormData();
            formData.append('file', image);
        
            console.log(image.name);
            const newPost = {
              name: name,
              email: email,
              image: image.name,
              password:password
            };
            
            formData.append('newPost', JSON.stringify(newPost));
        
            try {
              const response = await axios.post(`${process.env.REACT_APP_URL}register`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              if (response.data) {
              setImage('')
              navigate('/login')
              }
            } catch (error) {
              console.error('File upload failed:', error);
            }
          } catch (error) {
            console.error('File upload failed:', error.message);
          }
    
      
        setSubmitting(false);
      };
    
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center" bg="#C08C5D1A">
        <Flex
          flexDirection="column"
          bg="white"
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Image src={Logo} h="7rem" w="4rem" display="flex" alignSelf="center" />
          <Heading fontFamily="poppins" mb={6}>
            Register
          </Heading>
          
          <Formik
            initialValues={{ email: '', password: '',name:'' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
              {({ isSubmitting }) => (
            <Form>
              <Flex flexDirection="column">
              <Field name="name">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      mt="0.5rem"
                      w="35vw"
                      mb="0.5rem"
                      maxW="20rem"
                      placeholder="Enter your Name"
                      type="text"
                      fontSize="0.9rem"
                      variant="filled"
                      isInvalid={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <div style={{ fontFamily: 'poppins', fontSize: '0.7rem', color: 'red' }}>
  <ErrorMessage name="name" />
</div>
                <Field name="email">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      mt="0.5rem"
                      w="35vw"
                      maxW="20rem"
                      placeholder="Enter your email..."
                      type="email"
                      fontSize="0.9rem"
                      variant="filled"
                      isInvalid={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <div style={{ fontFamily: 'poppins', fontSize: '0.7rem', color: 'red' }}>
  <ErrorMessage name="email" />
</div>


  
                <Field   name="password">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      w="35vw"
                      maxW="20rem"
                      mt="1rem"
                      placeholder="**********"
                      type="password"
                      fontSize="0.9rem"
                      variant="filled"
                      isInvalid={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <div style={{ fontFamily: 'poppins', fontSize: '0.7rem', color: 'red' }}>
  <ErrorMessage name="password" />
</div>
<Field name="profile">
              {({ field, meta }) => (
             <>
             <Text fontFamily="poppins"  mt="0.5rem"  fontSize="0.9rem">Profile</Text>
             <Input
               type="file"
               mt="0.2rem"
               w="35vw"
               maxW="20rem"
               variant="filled"
               fontSize="0.9rem"
               onChange={(e) => {
                 setImage(e.target.files[0]);
               }}
             />
           </>
           
              )}
            </Field>
            <ErrorMessage name="profile" component="div" color="red" />

  
                <Button
                  type="submit"
                  bg="#CF796C"
                  color="white"
                  fontFamily="poppins"
                  mt={6}
                  mb={8}
                  _hover={{
                    bg:"#CF796C"
                  }}
                  disabled={isSubmitting} 
                  >
                    {isSubmitting ? 'Submitting' : 'Sign up'}
            
                </Button>
                <Flex> <Text fontFamily="poppins" fontSize="0.9rem">Already user?</Text> 
                <Link to='/login'> <Text  fontFamily="poppins" fontSize="0.9rem" ml="0.5rem" as="a" color="#CF796C"><u>Log in</u></Text></Link></Flex>
            
              </Flex>
              
            </Form>
             )}
          </Formik>
        </Flex>
      </Flex>
    )
}

export default Register