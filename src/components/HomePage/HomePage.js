import styles from './HomePage.module.css';

import { useEffect, useState } from 'react';
import { db, auth } from '../../config/Firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from '@firebase/firestore';

export const HomePage = () => {

    const [picutres, setPictures] = useState([]);

    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');

    const [updatedName, setUpdatedName] = useState('');

    const getPictures = async () => {
        const data = await getDocs(picturesCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setPictures(filteredData);
    }

    useEffect(() => {
        getPictures()
    }, [])

    const picturesCollectionRef = collection(db, "Pictures");

    const submitPicture = async () => {

        await addDoc(picturesCollectionRef, {
            title: name,
            imageUrl: imageUrl,
            userId: auth?.currentUser?.uid
        })
        getPictures()
    }

    const deletePicture = async (id) => {
        const picture = doc(db, "Pictures", id)
        await deleteDoc(picture)
        getPictures()
    }

    const updatePicture = async (id) => {
        const picture = doc(db, "Pictures", id)
        await updateDoc(picture, { title: updatedName })
        getPictures()
    }

    return (
        <main>
            <div className={styles["divPadding"]}>
                <label htmlFor="">Image Url</label>
                <input type="text" onChange={(e) => setImageUrl(e.target.value)} />
                <label htmlFor="">Picture Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <button onClick={submitPicture}>Submit picture</button>
            </div>
            <section className={styles["hero"]}>
                <div className={styles["hero-text"]}>
                    <h1>Welcome to Our Online Store</h1>
                    <p>Discover the latest trends and shop for your favorite products from the comfort of your home.</p>
                    <a href="#" className={styles["btn"]}>Shop Now</a>
                </div>
            </section>
            <section className={styles["featured-products"]}>
                <h2>Featured Products</h2>
                <div className={styles["products"]}>
                    {picutres.map((picture) => (
                        <div key={picture.id} className={styles["product"]}>
                            <img src={picture.imageUrl} alt="Product 1" />
                            <h3>{picture.title}</h3>
                            <button onClick={() => deletePicture(picture.id)}>Delete</button>
                            <label htmlFor="">Update Name</label>
                            <input type="text" onChange={(e) => setUpdatedName(e.target.value)} />
                            <button onClick={() => updatePicture(picture.id)}>Change name</button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}