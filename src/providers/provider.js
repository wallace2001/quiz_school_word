import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { firebase, persistentMode } from '../../config/firebase/client';
import { useRouter } from 'next/router';
import { questions } from '../data/questions.json';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [punt, setPunt] = useState(0);
    const [quiz, setQuiz] = useState();
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [error, setError] = useState(1);
    const [timer, setTimer] = useState(1);
    const [buttonDisabledQuiz, setButtonDisabledQuiz] = useState(true);
    const [auth, setAuth] = useState({
        loading: true,
        user: false,
    });
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState('');
    const [puntuation, setPuntuation] = useState('');
    const router = useRouter();

    // setTimeout(() => {
    //     setTimer(timer + 1);
    // },  * 1000);

    useEffect(() => {
        const fun = async() =>{
            await firebase.auth().onAuthStateChanged(async (user_id) => {
                const user = user_id;
                 await axios ({
                    method: 'POST',
                    url: '/api/profilenow',
                    data: {user}
                }).then(res => {
                        if(!res.data.error){
                            setButtonDisabledQuiz(false);
                            setName(res.data ? res.data[0].name : '');
                            setCompleted(res.data ? res.data[0].completed : '');
                            setPuntuation(res.data ? res.data[0].score : '');
                        }
                    setAuth({
                        loading: false,
                        user: user_id
                    })
                })
            })
        }

        fun();
    }, [indexQuestion]);

    const signIn = async({email, password}) => {
        firebase.auth().setPersistence(persistentMode);
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            router.push('/menu');
            return firebase.auth().currentUser;
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    const logout = async() => {
        await firebase.auth().signOut();
        router.push('/');
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
                router.push('/menu');
            });
        } catch (error) {
            setUser(error);
            console.log(error);
        }
    }

    const startNewQuiz = () => {
        const quiz = questions.sort(() => { return Math.random() - 0.5});

        setQuiz(quiz);
    }

    const addIndex = (value) => {
        setIndexQuestion(value + 1);
    }
    
    return(
        <AuthContext.Provider value={{
            auth, 
            signUp, 
            signIn, 
            logout, 
            setIndexQuestion, 
            startNewQuiz, 
            addIndex, 
            setPunt,
            completed,
            error,
            puntuation,
            indexQuestion,
            buttonDisabledQuiz,
            quiz, 
            name, 
            punt, 
            user
            }}>
            {children}
        </AuthContext.Provider>
    );
}