import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const prodConfig = {
  apiKey: 'AIzaSyBaFnxODyf-P6YSOzWX6d8hBO9Q-tGpQyk',
  authDomain: 'power-affirmation.firebaseapp.com',
  databaseURL: 'https://power-affirmation.firebaseio.com',
  projectId: 'power-affirmation',
  storageBucket: 'power-affirmation.appspot.com',
  messagingSenderId: '148502761246',
  appId: '1:148502761246:web:10fb95dceba750be4c430f',
  measurementId: 'G-5P45SE8K5Z',
};

const devConfig = {
  apiKey: 'AIzaSyBaFnxODyf-P6YSOzWX6d8hBO9Q-tGpQyk',
  authDomain: 'power-affirmation.firebaseapp.com',
  databaseURL: 'https://power-affirmation.firebaseio.com',
  projectId: 'power-affirmation',
  storageBucket: 'power-affirmation.appspot.com',
  messagingSenderId: '148502761246',
  appId: '1:148502761246:web:10fb95dceba750be4c430f',
  measurementId: 'G-5P45SE8K5Z',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db, firebase };
