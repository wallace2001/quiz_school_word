import fireb from 'firebase-admin';
import 'firebase/auth';

export const firebase_DB = fireb.apps.length ? 

    fireb.app() : 
    fireb.initializeApp({
    credential: fireb.credential.cert({
        type: "service_account",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        project_id: process.env.NEXT_PUBLIC_PROJECT_ID_SERVER,
        private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
        private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
        client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_cert: process.env.NEXT_PUBLIC_CLIENT_CERT,
    })
});