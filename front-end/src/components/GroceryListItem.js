import {useStateValue} from '../StateManager.js';
import {Button} from '@mui/material';
import './GroceryListItem.css';
import axios from 'axios';

const buttonStyle = {
  height: 30,
  marginTop: '18px',
  left: '75%',
  border: 1.4
}

function GroceryListItem({id, name, quantity}){
    const [{}, dispatch] = useStateValue();
    const jwtToken = localStorage.getItem("token")
    const authToken = 'jwt ' + jwtToken + ''
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/groceryList';
    const removeFromCart = () => {
      // tell StateManager to remove the specified cart item
      dispatch({
        type: "REMOVE_FROM_GROCERY_LIST",
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
    <>
    {Math.floor(name.length/11) > 0 ?
      <div style={{'margin-bottom': Math.floor(name.length/10-1)*16}} className="groceryListItemDiv">
        <p className="groceryListItemName">{name}</p>
        <p style={{'margin-top': 12+Math.floor(name.length/10)*16}} className="groceryListItemQuantity">{quantity}</p>
        <Button style={{'margin-top': 12+Math.floor(name.length/10)*16}} sx={buttonStyle} variant="outlined" onClick={removeFromCart}>Remove</Button>
      </div>
      :
      <div className="groceryListItemDiv">
        <p className="groceryListItemName">{name}</p>
        <p className="groceryListItemQuantity">{quantity}</p>
        <Button sx={buttonStyle} variant="outlined" onClick={removeFromCart}>Remove</Button>
      </div>}
    </>
  );
}

export default GroceryListItem;