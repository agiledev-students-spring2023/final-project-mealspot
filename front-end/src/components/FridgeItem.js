import {useStateValue} from '../StateManager.js';
import {Button} from '@mui/material';
import './FridgeItem.css';

const buttonStyle = {
  border: 1,
  height: 30,
  marginTop: '18px',
  left: '75%'
}

function FridgeItem({id, name, quantity}){
    const [{}, dispatch] = useStateValue();
    const removeFromFridge = () => {
      // tell StateManager to remove the specified cart item
      dispatch({
        type: "REMOVE_FROM_FRIDGE",
        id: id,
      })
    }

    return (
        <div className="fridgeItemDiv">
            <p className="fridgeItemName">{name}</p>
            <p className="fridgeItemQuantity">{quantity}</p>
            <Button sx={buttonStyle} onClick={removeFromFridge}>Remove</Button>
        </div>
    );
}

export default FridgeItem;