import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter, useRouteError} from 'react-router-dom';
import ShowIngredients from './Ingredients/ShowIngredients';
import { Box, Container, Stack, Typography } from '@mui/material';
import NewIngredient from './Ingredients/NewIngredient';

const ErrorDisplay = ({ entity }) => {
  const error = useRouteError();


  return <Container>
    <Stack direction={'column'} spacing={1}>
      <Typography variant='h4'>Desila se greška u učitavanju {entity}</Typography>
      <Typography>
        Jako nam je žao. Da li ste pokrenuli back-end server, možda?
      </Typography>
      <Typography variant='h6'>Interna greška je: </Typography>
      <Box>
        <pre>
          {error.message}
        </pre>
      </Box>
    </Stack>
  </Container>
}

const router = createBrowserRouter([

  {
    path: '/',
    element: <App/>,
    children: [

      {
        path: "ingredients",
        element: <ShowIngredients/>,
        errorElement: <ErrorDisplay entity='sastojaka.'/>,
        loader: async () => { 
          return fetch('http://localhost:8080/api/v1/ingredients');
        },
        // action: async () => {
        //   return fetch ('http://localhost:8080/api/v1/ingredients', {
        //     method: 'GET',
        //     headers: {
        //       "Content-Type": "application/json"
        //       // "Authorization": JSON.parse(localStorage.getItem('user')).token,
        //       //"Accept": "application/json"              
        //     },
                      
        //   });
        // }
      },
      {
        path: 'ingredients/new_ingredient',
        element: <NewIngredient/>,
        errorElement: <ErrorDisplay entity='sastojaka.' />,
        loader: async () => {
          
          const allergens_a = await fetch('http://localhost:8080/api/v1/allergen');
          const allergens = await allergens_a.json();

          return [allergens];
        }
      }, 





    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
