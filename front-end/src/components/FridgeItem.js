import {useStateValue} from '../StateManager.js';
import {Button} from '@mui/material';
import axios from 'axios';
import './FridgeItem.css';

const buttonStyle = {
  height: 30,
  marginTop: '18px',
  left: '75%',
  border: 1.4
}

function FridgeItem({id, name, quantity}){
    const [{}, dispatch] = useStateValue();
    const jwtToken = localStorage.getItem("token")
    const authToken = 'jwt ' + jwtToken + ''
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/fridge';
    const removeFromFridge = () => {
      // tell StateManager to remove the specified cart item
      dispatch({
        type: "REMOVE_FROM_FRIDGE",
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
      <div style={{'margin-bottom': Math.floor(name.length/10-1)*16}} className="fridgeItemDiv">
        <p className="fridgeItemName">{name}</p>
        <p style={{'margin-top': 12+Math.floor(name.length/10)*16}} className="fridgeItemQuantity">{quantity}</p>
        <Button style={{'margin-top': 12+Math.floor(name.length/10)*16}} sx={buttonStyle} variant="outlined" onClick={removeFromFridge}>Remove</Button>
      </div>
      :
      <div className="fridgeItemDiv">
        <p className="fridgeItemName">{name}</p>
        <p className="fridgeItemQuantity">{quantity}</p>
        <Button sx={buttonStyle} variant="outlined" onClick={removeFromFridge}>Remove</Button>
      </div>}
      </>
    );
}

export default FridgeItem;