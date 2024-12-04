import { Outlet } from 'react-router-dom';
import './movie.css';

const Movie = () => {
  return (
    <>
      <h1
        style={{
          color: "white",
          fontSize: "1.8rem",
          fontWeight: "bold",
          borderBottom: "1px solid #1d1c1b",
          paddingBottom: "15px", 
          marginBottom: "15px", 
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Movie Page
      </h1>

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Movie;
