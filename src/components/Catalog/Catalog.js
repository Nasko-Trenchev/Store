import { UserAuth } from "../../contexts/UserContext"

import { db, auth } from '../../config/Firebase';
import { getDocs, doc, addDoc, collection } from '@firebase/firestore'
import { useEffect, useState } from "react";

import styles from './Catalog.module.css';

export const Catalog = () => {

    const [uplodadedPictures, setUploadedPictures] = useState([]);

    const picturesRef = collection(db, "Pictures");

    const getPicturesFromDB = async () => {
        const data = await getDocs(picturesRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const personalPhotos = filteredData.filter(x => x.userId == auth.currentUser.uid);
        setUploadedPictures(personalPhotos);
    }
    useEffect(() => {
        getPicturesFromDB();
    }, [])

    const { user } = UserAuth();

    return (
        <>
            <h1>Pictures uploaded by {user.email}</h1>
            {uplodadedPictures.length > 0 ?
                uplodadedPictures.map((picture) => (
                    <div key={picture.id}>
                        <h2>{picture.title}</h2>
                        <img src={picture.imageUrl} alt={picture.id} />
                    </div>
                ))
                : <h1>You don`t have any uploaded pictures, yet!</h1>
            }
        </>
    )
}