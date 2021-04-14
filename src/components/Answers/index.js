import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Header } from "../Header";
import { RadioCards } from "../Quiz";
import { Container, Content } from "../Quiz/styles";

export const Answers = ({group, 
    isCorrect, 
    getRadioProps, 
    indexQuestion, 
    value, 
    toast, 
    handleSubmitQuiz, 
    quest, 
    options, 
    buttonLoading, 
    buttonDisabled, 
    setButtonLoading, 
    setButtonDisabled,
    numberQuestion,
    setNumberQuestion,
    punt,
    setIndexesQuestion}) => {

    return(
      <Container>
          <Header />
          <Content>
          <div className="quiz punt">
              <label style={{display: 'flex', justifyContent:"space-between", alignItems: 'center'}}>
                  Questão 0{indexQuestion + 1}
                  <p>Pontos: {punt}</p>
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
                          useEffect(() => {
                              setIndexesQuestion(index - 1);
                              console.log(index);
                          },[]);
                          return(
                              <RadioCards key={value} {...radio}>
                                  <h4>{value}){quest.alternatives[index]}</h4>
                              </RadioCards>
                          );
                      })}
                  </HStack>
              </div>
              <div className="button">
                  <Button colorScheme="orange" onClick={() => {
                      setButtonLoading(true);
                      setNumberQuestion(1);
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
          </Content>
  </Container>
    );
}