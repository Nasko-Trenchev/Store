
import { Routes, Route } from "react-router-dom";

import { db, auth, storage } from './config/Firebase'
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { AuthContextProvider } from './contexts/UserContext';

import { HomePage } from './components/HomePage/HomePage';
import { Catalog } from './components/Catalog/Catalog';
import { NavigationHeader } from './components/NavigationHeader/NavigationHeader'
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { AlertProvider } from './contexts/AlertContext';
import Alert from './components/Alert/Alert';

function App() {

  const [movieList, setMovielist] = useState([]);

  //new Movies state

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //UpdateTitleState

  const [updatedTitle, setUpdatedTitle] = useState("");

  //File upload state

  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollection = collection(db, "Movies")

  const getMovieList = async () => {

    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovielist(filteredData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {

    try {
      await addDoc(moviesCollection, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })

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

  const uploadFile = async () => {

    if (!fileUpload) {
      return;
    }

    const filesFolderRef = ref(storage, `ProjectFiles/${fileUpload.name}`);

    try {
      await uploadBytes(filesFolderRef, fileUpload);

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <AuthContextProvider>
      <AlertProvider>
        <Alert />
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/catalog' element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
        </Routes>
      </AlertProvider>
    </AuthContextProvider>
    // <div className='App'>
    //   <Register />

    //   <div>
    //     <input placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)} />
    //     <input placeholder='Release date...' type='number' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
    //     <input type='checkbox'
    //       checked={isNewMovieOscar}
    //       onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
    //     <label>Received an Oscar</label>
    //     <button onClick={onSubmitMovie}>Submit movie</button>
    //   </div>
    //   <div>
    //     {movieList.map((movie) => (
    //       <div key={movie.id}>
    //         <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'gray' }}>{movie.title}</h1>
    //         <p>Date: {movie.releaseDate}</p>
    //         <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
    //         <input placeholder='New Title' onChange={(e) => setUpdatedTitle(e.target.value)}></input>
    //         <button onClick={() => updateMovieTitle(movie.id)}>Change title</button>
    //       </div>
    //     ))}
    //   </div>
    //   <div>
    //     <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
    //     <button onClick={uploadFile}>Upload file</button>
    //   </div>
    // </div>
  );
}

export default App;
