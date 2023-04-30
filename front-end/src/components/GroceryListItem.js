import {useStateValue} from '../StateManager.js';
import {Button} from '@mui/material';
import './GroceryListItem.css';
import axios from 'axios';

const buttonStyle = {
  height: 30,
  marginTop: '18px',
  left: '75%'
}

function GroceryListItem({id, name, quantity}){
    const [{}, dispatch] = useStateValue();
    const jwtToken = localStorage.getItem("token")
    const authToken = 'jwt ' + jwtToken + ''
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/groceryList';
    const removeFromCart = () => {
      // tell StateManager to remove the specified cart item
      dispatch({
        type: "REMOVE_FROM_GROCERYLIST",
        id: id,
      })
      try{
        axios.post(url, {
            save: true,
            postType: 'remove',
            name: name,
        }, {headers: { Authorization: authToken }})
        }
        catch(err){
            console.log(err)
        }
    }

  return (
      <div className="groceryListItemDiv">
        <p className="groceryListItemName">{name}</p>
        <p className="groceryListItemQuantity">{quantity}</p>
        <Button sx={buttonStyle} variant="contained" onClick={removeFromCart}>Remove</Button>
      </div>
  );
}

export default GroceryListItem;