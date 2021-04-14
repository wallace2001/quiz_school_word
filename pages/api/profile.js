import { firebase_DB } from '../../config/firebase/server';

const db = firebase_DB.firestore();
const profile = db.collection('profiles');

export default async(req, res) => {
  const { name } = req.body;
  const [, token] = req.headers.authorization.split(' ');
  const { user_id } = await firebase_DB.auth().verifyIdToken(token);

  const user = profile.doc(req.body.name).set({
    userId: user_id,
    name,
    score: 0,
    completed: [
      {
        name: ''
      }
    ]
  });

  res.send(user);
}