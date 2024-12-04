import { Outlet } from 'react-router-dom';
import './movie.css';

const Movie = () => {
  return (
    <>
      <h1>Movie Page</h1>
      <Outlet />
    </>
  );
};

export default Movie;