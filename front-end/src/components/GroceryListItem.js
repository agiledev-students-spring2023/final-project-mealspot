import {useStateValue} from '../StateManager.js';
import {Button} from '@mui/material';
import './GroceryListItem.css';

const buttonStyle = {
    border: 1,
    height: 30,
    marginTop: '14px',
    left: '75%'
}

function GroceryListItem({id, name, quantity}){
    const [{}, dispatch] = useStateValue();
    const removeFromCart = () => {
      // tell StateManager to remove the specified cart item
      dispatch({
        type: "REMOVE_FROM_GROCERYLIST",
        id: id,
      })
    }

    return (
        <div className="groceryListItemDiv">
            <p className="groceryListItemName">{name}</p>
            <p className="groceryListItemQuantity">{quantity}</p>
            <Button sx={buttonStyle} onClick={removeFromCart}>Remove</Button>
        </div>
    );
}

export default GroceryListItem;