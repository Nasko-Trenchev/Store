import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth, GoogleProvider } from '../../config/Firebase';
import { UserAuth } from '../../contexts/UserContext';
import { signInWithPopup } from 'firebase/auth';

import styles from './Register.module.css'


export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const { createUser } = UserAuth();
    const navigate = useNavigate();
    console.log(auth?.currentUser?.email);
    const onHandlerSubmit = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            console.log("Wrong password!")
            return;
        }
        try {
            // await createUserWithEmailAndPassword(auth, email, password);
            await createUser(email, password);
            navigate('/');
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

    return (
        // <div>
        //     <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
        //     <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={signIn}>Sign in</button>
        //     <button onClick={signInWithGoogle}>Sign in with Google</button>
        //     <button onClick={Logout}>Logout</button>
        // </div>
        <div className={styles["register-container"]}>
            <form className={styles["register-form"]} onSubmit={onHandlerSubmit}>
                <h2>Register</h2>
                <label htmlFor="new-username">New Email:</label>
                <input type="text" id="new-username" name="new-username" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" onChange={(e) => setconfirmPassword(e.target.value)} />
                <button className={styles["registerButton"]} type="submit">Register</button>
            </form>
        </div>
    )
}