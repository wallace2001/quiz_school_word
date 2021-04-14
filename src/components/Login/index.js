import { Button } from '@chakra-ui/button'
import { FormLabel } from '@chakra-ui/form-control'
import { FormHelperText } from '@chakra-ui/form-control'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Link } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/layout'
import { Container } from '@chakra-ui/layout'

import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../providers/provider'
import { useRouter } from 'next/router'

export const Login = () => {

    const validationSchema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: yup.string().required('Senha obrigatório'),
    });
    const router = useRouter();
    const { signIn, auth, error } = useContext(AuthContext);
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
    } = useFormik({
        onSubmit: signIn,
        validationSchema,
        initialValues: {
            email: '',
            password: '',
        }
    })

    useEffect(() => {
        auth.user && router.push('/menu');
    },[auth.user])

    return (
        <Container centerContent margin="0 auto" display="flex" padding="1rem 3rem 1rem 3rem " alignItems="center" justifyContent="center" width="90%">
            <Box>
                <img src="/quiz1.svg" height={200} alt="logo"/>
            </Box>

            <Box >
                <Text color="#4A4A4A">
                Lorem ipsum is placeholder text commonly used in the graphic, print, and
                publishing industries for previewing layouts and visual mockups.
                </Text>
            </Box>
            <Box>
                {error.message && <Text marginTop="20px" color="red">Login inválido</Text> }
            </Box>
            <Box width="100%" marginTop="20px">
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    {touched.email && <FormHelperText color="red">{errors.email}</FormHelperText>}
                </FormControl>
            </Box>

            <Box width="100%" marginTop="20px">
                <FormControl id="password" isRequired>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {touched.password && <FormHelperText color="red">{errors.password}</FormHelperText>}
                </FormControl>
            </Box>
            <Box>
                <Button onClick={handleSubmit} isLoading={isSubmitting} background="#EF6E66" color="white" marginTop="50px">Entrar</Button>
            </Box>

            <Box marginTop="30px">
            <Text>
                Ainda não possui uma conta ?{" "}
                    <Link color="teal.500" href="/register">
                        Clique aqui
                    </Link>
                </Text>
            </Box>
        </Container>
    )
}
