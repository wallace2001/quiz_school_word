import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button';
import { Box, Text, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthContext } from '../../providers/provider';
import { Header } from '../Header';
import { FormHelperText } from '@chakra-ui/form-control';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Wrap = styled.div`
        width: 100%;
        height: 100%;

        margin: 40px 0px 0px 0px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;


        @media screen and (max-width: 750px){
            flex-direction: column;
        }
`;

export const Menu = () => {

    const {auth, setPunt, completed, puntuation, buttonDisabledQuiz} = useContext(AuthContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setPunt(0);
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
                <Wrap>
                    <WrapItem w="200px" p="2rem">
                        <Button onClick={() => {
                            setButtonLoading(true)
                            router.push('/quiz?=iot')
                    }} isLoading={buttonLoading} disabled={completed && completed[0].name === 'iot' || buttonDisabledQuiz} w="100%" colorScheme="orange" d="flex" flexDirection="column"><Text textAlign="center">{ completed && completed[0].name === 'iot' ? `IoT - concluido` : 'IoT'}</Text><Text textAlign="center">{completed && completed[0].name === 'iot' && `${puntuation} pontos`}</Text></Button>
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
