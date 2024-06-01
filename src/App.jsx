// import React from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Auth from "./components/Auth";
import { auth, db, storage } from "./config/firebase";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newMovieRelease, setMovieRelease] = useState("");
  const moviecollectionRef = collection(db, "Moovies");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  // console.log(auth);
  async function getMovieList() {
    try {
      const data = await getDocs(moviecollectionRef);
      // console.log(data);
      const updated = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMovieList(updated);
    } catch (error) {
      alert(error);
    }
  }
  async function updateMovieTitle(id, e) {
    e.preventDefault();
    const movieDoc = doc(db, "Moovies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    setUpdatedTitle("");
    getMovieList();
  }
  async function onSubmitMovie(e) {
    e.preventDefault();
    try {
      await addDoc(moviecollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieRelease,
        userId: auth.currentUser ? auth.currentUser.uid : null,
      });
      setnewMovieTitle("");
      setMovieRelease("");
      getMovieList();
    } catch (error) {
      alert(error);
    }
  }
  async function deleteMovie(id) {
    const movieDoc = doc(db, "Moovies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  async function uploadFile(e) {
    e.preventDefault();
    // console.log(fileUpload);
    const storageRef = ref(storage, `projectFile/${fileUpload.name}`);
    await uploadBytes(storageRef);
    setFileUpload("");
  }

  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <Auth />
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p> Date: {movie.releaseDate} </p>

            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
            <form onSubmit={(e) => updateMovieTitle(movie.id, e)}>
              <input
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input type="submit" value="Update Title" />
            </form>
          </div>
        ))}
      </div>
      <br />
      <form onSubmit={onSubmitMovie}>
        <input
          type="text"
          placeholder="titre du film"
          value={newMovieTitle}
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="date de sortie"
          value={newMovieRelease}
          onChange={(e) => setMovieRelease(e.target.value)}
        />
        <input type="submit" value="submit Movies" />
      </form>
      <br />
      <br />
      <form onSubmit={uploadFile}>
        {" "}
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <input type="submit" value="Upload File" />
      </form>
    </div>
  );
};

export default App;
