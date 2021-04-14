import { firebase_DB } from '../../config/firebase/server';
import { firebase } from '../../config/firebase/client';

const db = firebase_DB.firestore();


export default async (req, res) => {
    const user = req.body.user;
    try {
        const profiles = await db.collection('profiles');
        const doc = await profiles.where('userId', '==', user.uid).get();
        let user_id = [];
        doc.forEach(item => user_id.push(item.data()));
        res.send(user_id);
    } catch (error) {   
        return res.send({error: "Error"});
    }
}