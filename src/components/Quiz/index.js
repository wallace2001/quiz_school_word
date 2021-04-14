// import { Container } from '@chakra-ui/layout'
import React, { useContext, useEffect, useState } from 'react'
import { useRadio } from '@chakra-ui/radio';
import { useRadioGroup } from '@chakra-ui/radio';
import { Box } from '@chakra-ui/layout';
import { AuthContext } from '../../providers/provider';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import { questions } from '../../data/questions.json';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { firebase } from '../../../config/firebase/client';
import { Container, Content } from './styles';
import { Answers } from '../Answers';
import { Finsh } from '../Finished';

export const RadioCards = (props) => {
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
    const { auth, punt, setPunt, startNewQuiz, quiz, setIndexQuestion, completed, addIndex, indexQuestion } = useContext(AuthContext);
    const [value, setValue] = useState('');
    const [question, setQuestion] = useState(questions);
    const [numberQuestion, setNumberQuestion] = useState(1);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [indexesQuestion, setIndexesQuestion] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    
    const totalQuestions = question.length;
    const questionIndex = currentIndex;
    const quest = question[questionIndex];
    const isCorrect = quest.answer;
    const router = useRouter();
    const toast = useToast();
    
    useEffect(() => {
        const fun = async() =>{
            await !auth.user && router.push('/'); 
        }
        startNewQuiz();
        fun();
        
    }, [auth.user]);

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "options",
        defaultValue: '',
        onChange: setValue,
    })
    
    const group = getRootProps();

    console.log(quiz);
    console.log(indexQuestion);
    console.log(indexesQuestion);
    const condition = Number(indexQuestion) === Number(totalQuestions);
    
    useEffect(() => {
        setIsFinished( () => condition);
    }, [indexQuestion])

    console.log(punt);

      const handleSubmitQuiz = () => {
          
          if(isCorrect === value){
              setTimeout(() => {
                  setPunt(punt + 100);
                  const fun = async() => {
                      const nextQuestion = questionIndex + 1;
                      if(nextQuestion < totalQuestions) {
                          setCurrentIndex(questionIndex + 1);
                          setValue('');
                        }else{
                            setValue('');
                            
                        }
                    }
                    
                fun();
                }, 2 * 1000);
    }else{
        setTimeout(() => {
            setPunt(punt);
            const fun = async() => {
                const nextQuestion = questionIndex + 1;
                if(nextQuestion < totalQuestions) {
                    setCurrentIndex(questionIndex + 1);
                    setValue('');
                }else{
                    setValue('');
                    
                }
            }
            
            fun();
        }, 2 * 1000);
    }
          
          setTimeout(() => {
            addIndex(indexQuestion);
            setNumberQuestion(indexQuestion + 1);
            setButtonLoading(false);


        }, 2*1000);

      }

      console.log(isFinished);
      console.log(completed);

    return (
        !auth.loading ? (
            quest ? (
                <>
                {isFinished || completed[0].name === 'iot' ? (
                        <Finsh buttonLoading={buttonLoading} setIndexQuestion={setIndexQuestion} setButtonLoading={setButtonLoading} handleSubmitQuiz={handleSubmitQuiz} />
                    ) : (
                        <Answers punt={punt} setNumberQuestion={setNumberQuestion} numberQuestion={numberQuestion} isCorrect={isCorrect} value={value} toast={toast} handleSubmitQuiz={handleSubmitQuiz} quest={quest} options={options} buttonLoading={buttonLoading} buttonDisabled={buttonDisabled} getRadioProps={getRadioProps} group={group} group={group} indexQuestion={indexQuestion} quest={quest} options={options} setButtonLoading={setButtonLoading} setButtonDisabled={setButtonDisabled} setIndexesQuestion={setIndexesQuestion} />
                    )}
                </>) : (
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="orange"
                    size="xl"
                    />
                )
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
