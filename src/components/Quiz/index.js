// import { Container } from '@chakra-ui/layout'
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../Header'
import { useRadio } from '@chakra-ui/radio';
import { useRadioGroup } from '@chakra-ui/radio';
import { HStack, Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { AuthContext } from '../../providers/provider';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import { questions } from '../../data/questions.json';
import { route } from 'next/dist/next-server/server/router';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { firebase } from '../../../config/firebase/client';

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

        .question{
            width: 100%;
            height: auto;

            padding: 5%;

            p{
                font-size: 1rem;
                color: #656565;
            }

            img{
                margin: 0 auto;
            }
        }

        .selection{
            width: 100%;
            height: auto;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;


            input{
                margin-top: 30px;
            }
        }

        .button{
            width: 100%;
            height: 100%;

            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;


const RadioCards = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return(
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                fontSize={15}
                display="flex"
                alignItems="center"
                justifyContent="center"
                _checked={{
                bg: 'orange.600',
                color: "white",
                borderColor: "orange.600",
                }}
                _focus={{
                boxShadow: "outline",
                }}
                px={3}
                py={3}
            >
                {props.children}
            </Box>

        </Box>
    );
}

export const Quiz = () => {

    const options = ["1", "2", "3", "4", "5"];
    const { auth, punt, setPunt } = useContext(AuthContext);
    const [value, setValue] = useState('');
    const [question, setQuestion] = useState(questions);
    const [results, setResults] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "options",
        defaultValue: '',
        onChange: setValue,
    })

    const totalQuestions = question.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const questionIndex = currentIndex;
    const quest = question[questionIndex];

    const isCorrect = quest.answer;

    const router = useRouter();
    const group = getRootProps();

    useEffect(() => {
        const fun = async() =>{
            await !auth.user && router.push('/'); 
        }

        fun();
        
    }, [auth.user]);


    const addResult = (result) => {
        setResults([...results, result]);
    }

    const toast = useToast();

      const handleSubmitQuiz = () => {

        if(isCorrect === value){
            setTimeout(() => {
                const fun = async() => {
                    await setPunt(punt + 100);
                    const nextQuestion = questionIndex + 1;
                
                    if(nextQuestion < totalQuestions) {
                        setCurrentIndex(questionIndex + 1);
                        setValue('');
                        setButtonLoading(false);
                    }else{
                        router.push('/ranking');
                        const token = await firebase.auth().currentUser.getIdToken();
                        const uid = await firebase.auth().currentUser.uid;
                        setButtonLoading(false);
                        setValue('');
                        axios.post('/api/updatestore', {score: punt, uid}, {headers: {'authorization': `Bearer ${token}`}}).then();
    
                      }
                }

                fun();
            }, 2 * 1000);
        }else{
            setTimeout(() => {
                const fun = async() => {
                    setPunt(punt);
                    const nextQuestion = questionIndex + 1;
                
                    if(nextQuestion < totalQuestions) {
                        setCurrentIndex(questionIndex + 1);
                        setButtonLoading(false);
                        setValue('');
                    }else{
                        router.push('/ranking');
                        const token = await firebase.auth().currentUser.getIdToken();
                        const uid = await firebase.auth().currentUser.uid;
                        setButtonLoading(false);
                        setValue('');
                        axios.post('/api/updatestore', {score: punt, uid}, {headers: {'authorization': `Bearer ${token}`}}).then();
    
                      }
                }

                fun();
            }, 2 * 1000);
        }


      }

    return (
        !auth.loading ? (
        <Container>
            <Header />
            <Content>
                {quest ? (
                    quest.index === questions.length ? (
                        <Box w="40%" d="flex" flexDirection="column" justifyContent="center">
                            <Box m="0 auto">
                                <img src="/logo.png" alt="logo" style={{width: '300px', height: '300px'}} />
                            </Box>
                            <Box>
                                <Text textAlign="center">Você respondeu todas as perguntas, clique em finalizar para ver o resultado e sua classificação.</Text>
                            </Box>
                            <Button marginTop="40px" onClick={() => {
                                handleSubmitQuiz();
                                setButtonLoading(true);
                                }}isLoading={buttonLoading}>Finalizar</Button>
                        </Box>
                    ) :
                    <div className="quiz">
                    <label>
                        Questão {quest.index}
                    </label>
                    <div style={{ width: '100%', height: '1px', border: '1px solid #ccc'}}></div>

                    <div className="question">
                        <p>{quest.title}</p>
                        <img src={quest.image} style={{width: '150px', height: '150px'}} />
                    </div>

                    <div className="selection">
                        <HStack {...group} onClick={() => {
                            setButtonLoading(false);
                            setButtonDisabled(false);
                        }} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="flex-start">
                            {options.map((value, index) => {
                                const radio = getRadioProps({ value })
                                return(
                                    <RadioCards key={value} {...radio}>
                                        <h4>{value}) {quest.alternatives[index]}</h4>
                                    </RadioCards>
                                );
                            })}
                        </HStack>
                    </div>
                    <div className="button">
                        <Button colorScheme="orange" onClick={() => {
                            setButtonLoading(true);

                            if(value === ''){
                                toast({
                                    title: "Escolha uma alternativa",
                                    status: "warning",
                                    duration: 1000,
                                    isClosable: true,
                                })
                            }

                            else if(isCorrect === value){
                                handleSubmitQuiz();
                                toast({
                                    title: "Acertou",
                                    status: "success",
                                    duration: 1000,
                                    isClosable: true,
                                })
                            }else{
                                handleSubmitQuiz();
                                toast({
                                    title: "Errou",
                                    status: "error",
                                    duration: 1000,
                                    isClosable: true,
                                })
                            }
                            }} isLoading={buttonLoading}
                                disabled={buttonDisabled}
                            >Responder</Button>
                    </div>
                </div>
                ) : (
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="orange"
                    size="xl"
                    />
                )}

            </Content>
        </Container>
        ) : (
            <Box w="100%" h="100vh" d="flex" justifyContent="center" alignItems="center">
            <Spinner
                thickness="4px"
                speed="0.65s"
                color="orange"
                size="xl"
                />
            </Box>
            )
    )
}
