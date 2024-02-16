import { Button, Flex, Heading, Input, Image, Box, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Logo from '../assets/logo.png'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      });

      const navigate=useNavigate()
    const handleLogin =async (values, { setSubmitting }) => {
        const {email,password}=values
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}login`, {
                email:email,
                password:password
            }, {
            });
            console.log(response.data);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/')
            }
          } catch (error) {
            console.error('File upload failed:', error);
          }
      
        setSubmitting(false);
      };

      const user=localStorage.getItem('user')
      useEffect(()=>{
    if(user){
      navigate('/')
    }
      },[])

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
            Log in
          </Heading>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
              {({ isSubmitting }) => (
            <Form>
              <Flex flexDirection="column"> {/* Updated to column layout */}
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
                    {isSubmitting ? 'Logging In...' : 'Log In'}
            
                </Button>
               <Flex> <Text fontFamily="poppins" fontSize="0.9rem">New user?</Text> 
                <Link to='/register'> <Text  fontFamily="poppins" fontSize="0.9rem" ml="0.5rem" as="a" color="#CF796C"><u>Sign up</u></Text></Link></Flex>
              </Flex>
            </Form>
             )}
          </Formik>
        </Flex>
      </Flex>
    )
}

export default Login