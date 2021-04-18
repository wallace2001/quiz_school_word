import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../../providers/provider';
import { Header } from '../Header';
import { useRouter } from 'next/router';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .quiz{
        width: 60%;
        height: auto;

        border: 1px solid #ccc;
        margin-bottom: 20px;

        label{
            padding: 2.3rem;
            font-size: 1.4rem;
        }

        .results{
            width: 100%;

            display: flex;
            flex-direction: column;

            label:first-child{
                font-size: 1rem;
            }

            label:last-child{
                font-size: 0.9rem;
            }
        }

        .ranking{
            width: 60%;
            height: 30rem;
            margin: 0 auto;
            margin-bottom: 30px;

            border: 1px solid black;

            overflow-y: scroll;
        }

        .button{
            width: 100%;
            height: 100%;

            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .wrap{
            padding: 1rem 5rem 1rem 5rem;
            transition: 0.4s ease-in-out;

            @media screen and (max-width: 1100px){
                padding: 1rem 2rem 1rem 2rem;
                transition: 0.4s ease-in-out;
            }


        }

        .wrap_item{
            @media screen and (max-width: 630px){
                flex-direction: column;
            }
        }
    }
`;

export const Balls = styled.div`
        width: 40px;
        height: 40px;
        border-radius: 50%;
            
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: ${({bgColor}) => bgColor};
        transition: 0.5s ease-in-out;

        p{
            font-size: 1.5rem;
            color: #fff;
        }
`;

export const Classfication = () => {

    const [loading, setLoading] = useState(true);
    const { punt, auth, name } = useContext(AuthContext);
    const [ranking, setRanking] = useState([]);
    const [colorRandom, setColorRandom] = useState(`#${(Math.random()*0xFFFFFF<<0).toString(16)}`);
    const [counterTimer, setCounterTimer] = useState(0);
    const [loadingRanking, setLoadingRanking] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const router = useRouter();

    setTimeout(() => {
        setLoading(false);
    }, 2 * 1000);

    useEffect(() => {
        const fun = async() => {
            await axios ({
                method: 'GET',
                url: '/api/score',
            }).then(res => {
                setLoadingRanking(false);
                setRanking(res.data)
            });
        }
            if(!auth.loading) {
                auth.user ? router.push('/classfication') : router.push('/') ;
            }
            fun();

    },[auth.user]);

    useEffect(() => {
        setTimeout(() => {
            setColorRandom(`#${(Math.random()*0xFFFFFF<<0).toString(16)}`)
            setCounterTimer(counterTimer + 1);
        }, 4*1000);
    },[counterTimer]);

    ranking.sort((a, b) => {
        return b.score - a.score
    });

    return (
        <Container>
            <Header />

            <Content>
                {loading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        color="orange"
                        size="xl"
                    />
                ) : 
                (
                    <div className="quiz">
                    <Text textAlign="center" fontSize="20px" p={3}>Resultados e Classificação</Text>

                    <div className="ranking" >
                        <Text textAlign="center" fontSize="20px" p={3}>Classificação</Text>
                        {!loadingRanking ? (
                            ranking.map((item, index) => {
                                return(
                                    <Wrap className="wrap" key={index}>
                                    <WrapItem className="wrap_item" w="100%" d="flex" alignItems="center" justifyContent="space-between" >
                                        <Balls bgColor={colorRandom}><p>{index + 1}°</p></Balls>
                                        <Text p={3} fontSize="18px" flex={8}>{item.name}</Text>
                                        <Text flex={1} textAlign="center">{item.score} pontos</Text>
                                    </WrapItem>
                                    <Divider p={3}/>
                                </Wrap>
                                );
                            })
                        ) : 
                        (
                            <Box w='100%' h="100%" d="flex" alignItems="center" justifyContent="center">                
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    color="blue.300"
                                    size="xl"
                                    />
                            </Box>
                        )}
                    </div>

                    <div className="button">
                        <Button colorScheme="orange" onClick={() => {
                            router.push('/menu')
                            setButtonLoading(true)
                            }} isLoading={buttonLoading}>Ir para menu</Button>
                    </div>
                </div>
                )}

            </Content>
        </Container>
    )
}
