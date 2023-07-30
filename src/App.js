// import logo from './logo.svg';
//import './App.css';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return <>



    <List> 
      <ListItem component={NavLink} to="ingredients">
        <ListItemButton>
          <ListItemText primary="Ingredients" />
        </ListItemButton>
      </ListItem>

    </List>

    <Outlet></Outlet> 
  

  </>
}

export default App;
