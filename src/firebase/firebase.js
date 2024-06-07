import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXK_0XwDUiJq1twqMZYZjmNUKwY0BCEAY',
  authDomain: 'time-tracking-app-3618a.firebaseapp.com',
  projectId: 'time-tracking-app-3618a',
  storageBucket: 'time-tracking-app-3618a.appspot.com',
  messagingSenderId: '486389165557',
  appId: '1:486389165557:web:ace232140eef31db9b84bc',
  measurementId: 'G-24KP9385SR',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
