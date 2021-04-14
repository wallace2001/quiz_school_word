import { firebase_DB } from '../../config/firebase/server';
import { firebase } from '../../config/firebase/client';

const db = firebase_DB.firestore();


export default async (req, res) => {
    const token = req.headers.authorization;

    try {
        const user = firebase.auth().currentUser;
        const profiles = await db.collection('profiles');
        const doc = await profiles.get();
        let users = [];

        doc.forEach(doc => {
            users.push(doc.data());
          });
        res.send(users);
    } catch (error) {   
        return res.send({error: "Error"});
    }
}