import { Alert, AlertIcon } from "@chakra-ui/alert";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { firebase, persistentMode } from '../../config/firebase/client';
import { Login } from "../components/Login";
import { useRouter } from 'next/router';
import { questions } from '../data/questions.json';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [punt, setPunt] = useState(0);
    const [auth, setAuth] = useState({
        loading: true,
        user: false,
    });
    const [name, setName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fun = async() =>{
            firebase.auth().onAuthStateChanged(user_id => {
                const user = user_id;
                 axios ({
                    method: 'POST',
                    url: '/api/profilenow',
                    data: {user}
                }).then(res => {
                    !res.data.error && setName(res.data[0].name)
                })

                setAuth({
                    loading: false,
                    user: user_id
                })
            })
        }

        fun();
    }, []);

    const correct = (props) =>{
        setIsCorrect(props);
    }

    const logout = async() => {
        await firebase.auth().signOut();
        router.push('/');
    }

    const signIn = async({email, password}) => {
        firebase.auth().setPersistence(persistentMode);
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            router.push('/menu');
            return firebase.auth().currentUser;
        } catch (error) {
            console.log(error);
        }
    }

    const signUp = async({name, email, password}) => {


        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user_login = await signIn({email, password});
            const token = await user_login.getIdToken();
            
            await axios({
                method: 'post',
                url: '/api/profile',
                data: {name},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                router.push('/quiz');
            });
        } catch (error) {
            setUser(error);
            console.log(error);
        }
    }
    
    return(
        <AuthContext.Provider value={{auth, signUp, signIn, logout, setPunt, name, punt, user}}>
            {children}
        </AuthContext.Provider>
    );
}