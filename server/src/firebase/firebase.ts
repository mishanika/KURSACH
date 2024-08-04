import { getFirestore } from "firebase-admin/firestore";
import adm from "firebase-admin";

export const admin = adm.initializeApp({
  credential: adm.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

export const database = getFirestore();
export const bucket = admin.storage().bucket("gs://kursach-3f64f.appspot.com");
