import { firebase_DB } from '../../config/firebase/server';
import { firebase } from '../../config/firebase/client';

const db = firebase_DB.firestore();

export default async(req, res) => {
    // const bearer = req.headers.authorization;
    const [, token] = req.headers.authorization.split(' ');
    const score = req.body.score;
    const uid = req.body.uid;

    try {
        if(!token){
            return res.send({error: "Not found bearer token"});
        }

        const profile = await db.collection('profiles');
        const doc = await profile.where('userId', '==', uid).get();
        let user_id = [];
        doc.forEach(item => user_id.push(item.data()));

        const name = user_id[0].name;
        const score_db = user_id[0].score;

        const sum = score_db + score;

        const profiles = await db.collection('profiles').doc(name).update({
            score: sum
        });
        
        res.send(profiles);
    } catch (error) {
        res.send(error);
    }
}