import { useState } from 'react';
import { auth, GoogleProvider } from '../../config/Firebase';
import { UserAuth } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import styles from './Login.module.css'


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(auth?.currentUser?.email);
    const navigate = useNavigate();
    const { loginUser , signUpWithGoogle} = UserAuth();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signUpWithGoogle()
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
            <form className={styles["login-form"]} onSubmit={signIn}>
                <h2>Login</h2>
                <label htmlFor="username">Email:</label>
                <input type="text" id="username" name="username" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <button type="submit" onClick={signInWithGoogle}>Login in with Google</button>
            </form>
        </div>
    )
}