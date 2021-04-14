import { Button } from '@chakra-ui/button';
import { Box, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../../providers/provider';
import { Header } from '../Header';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Menu = () => {

    const {auth, setPunt, punt} = useContext(AuthContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const router = useRouter();
    setPunt(0);

    useEffect(() => {
        if(!auth.loading) {
            auth.user ? router.push('/menu') : router.push('/') ;
          }
        
    }, [auth.user]);

    return (
        !auth.loading ?
        <Container>
            <Header />

            <Box w="100%" h="100%" p="2rem 20% 2rem 20%">
                <Text textAlign="center" fontSize="1.5rem">Seleção de Quizes</Text>
                <Wrap margin="40px 0px 0px 0px" d="flex" flexWrap="wrap" alignItems="center" justifyContent="center">
                    <WrapItem w="200px" p="2rem">
                        <Button onClick={() => {
                            setButtonLoading(true)
                            router.push('/quiz?=iot')
                    }} isLoading={buttonLoading} w="100%" colorScheme="orange">IoT</Button>
                    </WrapItem>
                    <WrapItem w="200px" p="2rem">
                    <Button
                        isLoading
                        loadingText="not ready"
                        colorScheme="orange"
                        variant="outline"
                    >
                        </Button>
                    </WrapItem>
                    <WrapItem w="200px" p="2rem">
                    <Button
                        isLoading
                        loadingText="not ready"
                        colorScheme="orange"
                        variant="outline"
                    >
                        </Button>
                    </WrapItem>
                    <WrapItem w="200px" p="2rem">
                    <Button
                        isLoading
                        loadingText="not ready"
                        colorScheme="orange"
                        variant="outline"
                    >
                        </Button>
                    </WrapItem>
                    <WrapItem w="200px" p="2rem">
                    <Button
                        isLoading
                        loadingText="not ready"
                        colorScheme="orange"
                        variant="outline"
                    >
                        </Button>
                    </WrapItem>

                </Wrap>
            </Box>
        </Container>
        : 
        <Box w="100%" h="100vh" d="flex" justifyContent="center" alignItems="center">
            <Spinner
                thickness="4px"
                speed="0.65s"
                color="orange"
                size="xl"
                />
        </Box>
    )
}
