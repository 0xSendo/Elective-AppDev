import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recent = () => {
    // const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  // Fetch exercises data
  const fetchExercises = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/exercises");
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      overflowY: "scroll", // Enables scrolling
      maxHeight: "400px",  // Limits visible height
      border: "1px solid #ccc", // Optional: adds a border for clarity
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      width: "250px",
      backgroundColor: "#f9f9f9",
    },
    header: {
      fontWeight: "bold",
      marginBottom: "10px",
      color: "teal",
      width: "100%", // Ensures header takes full width
    },
    error: {
      color: "red",
    },
  };
  

  return (
    <div
  style={{
    ...styles.container,
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'scroll', // Enables vertical scrolling
    maxHeight: '400px', // Sets the maximum height for the container
  }}
>   
<Link to="/home2"><button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
</Link>
  <h2 style={styles.header}>Exercises List</h2>
  
      <br></br>
  {error && <p style={styles.error}>{error}</p>}
  {exercises.length > 0 ? (
    exercises.map((exercise) => (
      <div key={exercise.exerciseID} style={styles.card}>
        {/* <h3>{exercise.name || "Unnamed Exercise"}</h3> */}
        <p style={{color:'teal'}}>
            <strong>Favorite Exercise: </strong> {exercise.name || "N/A"}
        </p>
        <p>
          <strong>ExerciseID:</strong> {exercise.exerciseID || "N/A"}
        </p>
        <p>
          <strong>Description:</strong> {exercise.description || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {exercise.category || "N/A"}
        </p>
        {exercise.videoURL && (
          <p>
            <strong>Video:</strong>{" "}
            <a href={exercise.videoURL} target="_blank" rel="noreferrer">
              Watch Here
            </a>
          </p>
        )}
      </div>
    ))
  ) : (
    <p>Loading exercises...</p>
  )}
</div>

  );
};

export default Recent;
