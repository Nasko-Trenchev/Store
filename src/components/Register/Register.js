import { useState } from 'react';
import { auth, GoogleProvider } from '../../config/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import styles from './Register.module.css'


export const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    console.log(auth?.currentUser?.email);

    const register = async () => {
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
        // <div>
        //     <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
        //     <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={signIn}>Sign in</button>
        //     <button onClick={signInWithGoogle}>Sign in with Google</button>
        //     <button onClick={Logout}>Logout</button>
        // </div>
        <div className={styles["container"]}>
            <form className={styles["register-form"]} action="register.php">
                <h2>Register</h2>
                <label htmlFor="new-username">New Email:</label>
                <input type="text" id="new-username" name="new-username" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" />
                <button type="submit" onClick={register}>Register</button>
                <button onClick={Logout}>Logout</button>
            </form>
        </div>
    )
}