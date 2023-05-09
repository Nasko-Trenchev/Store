import { useState } from 'react';
import { auth, GoogleProvider } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider)
        } catch (error) {
            console.log(error);
        }
    }

    const Logout = async () => {

        try {
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}