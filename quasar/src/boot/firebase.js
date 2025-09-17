// src/boot/firebase.js

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// **SUA CONFIGURAÇÃO DO FIREBASE**
const firebaseConfig = {
  apiKey: 'AIzaSyAyN-BwYsEV6ItieMg8b_CLrcSPgDhfW9I',
  authDomain: 'sistema-de-apoio-a-alunos.firebaseapp.com',
  projectId: 'sistema-de-apoio-a-alunos',
  storageBucket: 'sistema-de-apoio-a-alunos.firebasestorage.app',
  messagingSenderId: '87957535973',
  appId: '1:87957535973:web:bcbb210d2f41c68234e80c',
  measurementId: 'G-8FEZGLTDVS',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
