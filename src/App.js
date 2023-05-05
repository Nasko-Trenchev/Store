import './App.css';

import { db } from './config/Firebase'
import { Auth } from './components/Auth';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {

  const [movieList, setMovielist] = useState([]);

  //new Movies state

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //UpdateTitleState

  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollection = collection(db, "Movies")

  const getMovieList = async () => {

    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovielist(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    getMovieList();
  }, []);

  const onSubmitMovie = async () => {

    try {
      await addDoc(moviesCollection, { title: newMovieTitle, releaseDate: newReleaseDate, receivedAnOscar: isNewMovieOscar })

    } catch (error) {
      console.log(error);
    }
    getMovieList();
  }

  const deleteMovie = async (id) => {
    const movie = doc(db, "Movies", id)
    await deleteDoc(movie)
  }

  const updateMovieTitle = async (id) => {
    const movie = doc(db, "Movies", id)
    await updateDoc(movie, { title: updatedTitle })
  }
  return (
    <div className='App'>
      <Auth />

      <div>
        <input placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder='Release date...' type='number' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type='checkbox'
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'gray' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='New Title' onChange={(e) => setUpdatedTitle(e.target.value)}></input>
            <button onClick={() => updateMovieTitle(movie.id)}>Change title</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
