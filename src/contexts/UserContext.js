import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, GoogleProvider } from "../config/Firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    const signUpWithGoogle = () => {
        return signInWithPopup(auth, GoogleProvider)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={{ createUser, loginUser, signOutUser, user, signUpWithGoogle }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}