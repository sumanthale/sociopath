import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import config from './config.json';

const app = firebase.initializeApp({
  ...config,
});

export const auth = app.auth();
export const appStore = app.storage('gs://covid-tracker-37f36.appspot.com');

export const db = firebase.firestore();
export default firebase;
// db.collection('posts').doc('koXRtasVRZ463kycmrfA').set(
//   {
//     like: 2,
//   },
//   {
//     merge: true,
//   }
// );
