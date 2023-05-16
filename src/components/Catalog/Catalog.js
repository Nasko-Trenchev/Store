import { UserAuth } from "../../contexts/UserContext"

import { db, auth } from '../../config/Firebase';
import { getDocs, doc, addDoc, collection } from '@firebase/firestore'
import { useEffect, useState } from "react";

import styles from './Catalog.module.css';

export const Catalog = () => {

    const [uplodadedPictures, setUploadedPictures] = useState([]);
    const [uploadedPizza, setUploadedPizza] = useState([]);
    const [formValues, setFormValues] = useState({
        "name": '',
        "imageUrl": '',
        "prize": ''
    });
    const [ingreadiance, setIngreadiance] = useState({
        "mozzarella": false,
        "tomatoes": false,
        "salami": false
    })
    const pizzaCollectionRef = collection(db, "Pizza");
    const picturesRef = collection(db, "Pictures");

    const getPizzaFromDB = async () => {
        const data = await getDocs(pizzaCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUploadedPizza(filteredData);
    }

    const getPicturesFromDB = async () => {
        const data = await getDocs(picturesRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const personalPhotos = filteredData.filter(x => x.userId == auth.currentUser.uid);
        setUploadedPictures(personalPhotos);
    }
    useEffect(() => {
        getPicturesFromDB();
        getPizzaFromDB();
    }, [])

    const { user } = UserAuth();


    const onIngreadanceChange = (e) => {
        setIngreadiance(state => ({ ...state, [e.target.value]: e.target.checked }))
    }

    const onChangeHandler = (e) => {
        let value = e.target.value;
        setFormValues(state => ({ ...state, [e.target.name]: value }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        await addDoc(pizzaCollectionRef, {
            name: formValues.name,
            imageUrl: formValues.imageUrl,
            ingreadiances: ingreadiance,
            prize: formValues.prize,
            userId: auth?.currentUser?.uid
        })
    }
    return (
        <div className={styles[".catalogContainer"]}>
            <h1 className={styles["catalog-h1"]}>Create Pizza</h1>
            <form className={styles["pizzaSubmitForm"]} onSubmit={onFormSubmit}>
                <label htmlFor="name">Pizza name</label>
                <input type="text" name="name" onChange={onChangeHandler} value={formValues.name}></input>
                <label>ImageUrl</label>
                <input type="url" name="imageUrl" onChange={onChangeHandler} value={formValues.imageUrl}></input>
                <label htmlFor="prize">Prize</label>
                <input type="number" name="prize" onChange={onChangeHandler} value={formValues.prize}></input>
                <label>Ingreadiances</label>
                <label htmlFor="mozzarella">Mozzarella</label>
                <input type="checkbox" name="mozzarella" value="mozzarella" id="mozzarella" onChange={onIngreadanceChange} checked={ingreadiance["mozzarella"]} />
                <label htmlFor="tomatoes">Tomatoes</label>
                <input type="checkbox" name="tomatoes" value="tomatoes" id="tomatoes" onChange={onIngreadanceChange} checked={ingreadiance["tomatoes"]} />
                <label htmlFor="salami">Salami</label>
                <input type="checkbox" name="salami" value="salami" id="salami" onChange={onIngreadanceChange} checked={ingreadiance["salami"]} />
                <button>Submit</button>
            </form>
            {uploadedPizza.length > 0 ?
                uploadedPizza.map((pizza) => (
                    <div className={styles["picture"]} key={pizza.id}>
                        <h2>{pizza.name}</h2>
                        <img src={pizza.imageUrl} alt={pizza.id} />
                        <p>{pizza.prize}</p>
                        {Object.entries(pizza.ingreadiances).map((topping) => <p key={topping}>{topping}</p>)}
                    </div>
                ))
                : <h1>You don`t have any uploaded pizzas, yet!</h1>
            }
            </div>
    )
}