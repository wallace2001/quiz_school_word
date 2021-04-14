import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Header } from '../Header';
import { Content, Container } from '../Quiz/styles';
import { firebase } from '../../../config/firebase/client';
import { AuthContext } from '../../providers/provider';

export const Finsh = ({ setIndexQuestion }) => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const router = useRouter();
    const {punt, setPunt} = useContext(AuthContext);

    return(
      <Container>
          <Header />
          <Content>
          <Box w="40%" d="flex" flexDirection="column" justifyContent="center">
              <Box m="0 auto">
                  <img src="/logo.png" alt="logo" style={{width: '300px', height: '300px'}} />
              </Box>
              <Box>
                  <Text textAlign="center">Parabéns você respondeu todas as perguntas, clique para ver seus resultados...</Text>
              </Box>
              <Button marginTop="40px" onClick={() => {
                  setButtonLoading(true);
                  const fun = async() => {
                      const token = await firebase.auth().currentUser.getIdToken();
                      const uid = await firebase.auth().currentUser.uid
                      axios.post('/api/updatestore', {score: punt, uid}, {headers: {'authorization': `Bearer ${token}`}}).then((res) => {
                          if(!res.data.error){
                              router.push('/ranking');
                              setTimeout(() => {
                                  setIndexQuestion(1);
                              }, 2*1000);
                        }
                    });
                }
                fun();
                  }}isLoading={buttonLoading}>Finalizar</Button>
          </Box>
          </Content>
  </Container>
    );
}