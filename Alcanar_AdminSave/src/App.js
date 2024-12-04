import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Register from './pages/Public/Register/Register';
import Movie from './pages/movie/movie';
import axios from 'axios'; // To fetch movies
import Lists from './pages/movie/List/List';
import Form from './pages/movie/Form/Form';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
  path: '/register',
  element: <Register />,
},
  {
    path: '/main',
    element: <Main />,
    children: [
      //Temporarily disabled the dashboard route
       {
         path: '/main/dashboard',
        element: <Dashboard />,
       },
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;