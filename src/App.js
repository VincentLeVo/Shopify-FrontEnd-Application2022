import React, { useState, useEffect, useCallback } from "react";

import PhotosList from "./components/PhotosList";
import "./App.css";
import DateInput from "./components/DateInput";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=qICy7boIIXqCoaiehMJsJZ41ZsrlPzrn7zLaxbIF&start_date=2022-01-17"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedPhotos = data.map((photoData) => {
        return {
          id: photoData.date,
          date: photoData.date,
          title: photoData.title,
          url: photoData.url,
        };
      });
      setPhotos(transformedPhotos);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPhotosHandler();
  }, [fetchPhotosHandler]);

  const fetchCustomPhotoHandler = useCallback(async (date) => {
    setIsLoading(true);
    setError(null);
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=qICy7boIIXqCoaiehMJsJZ41ZsrlPzrn7zLaxbIF&date=" +
      date;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const photoData = await response.json();
      const transformedPhoto = {
        id: photoData.date,
        date: photoData.date,
        title: photoData.title,
        url: photoData.url,
      }
      setPhotos([transformedPhoto]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let content = <h2>Found no photos.</h2>;

  if (photos.length > 0) {
    content = <PhotosList photos={photos} />;
  }

  if (error) {
    content = <h2>{error}</h2>;
  }

  if (isLoading) {
    content = <h2 className="loading">Loading...</h2>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchPhotosHandler}>Fetch Latest Photos</button>
        <p>Or</p>
        <DateInput onFetchCustomPhoto={fetchCustomPhotoHandler} />
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
