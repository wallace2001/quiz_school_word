import fireb from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAZnIbWbwhi9mEJ5F0Fz4nSGk1mSDpDS9E",
    authDomain: "quiz-b16a3.firebaseapp.com",
    projectId: "quiz-b16a3",
    storageBucket: "quiz-b16a3.appspot.com",
    messagingSenderId: "992681385124",
    appId: "1:992681385124:web:4e49abf1ab34fdbfe29a31",
    measurementId: "G-7H0RNMCSVV"
  };
  export const firebase = fireb.apps.length ? fireb.app() : fireb.initializeApp(firebaseConfig);

  export const persistentMode = fireb.auth.Auth.Persistence.LOCAL;