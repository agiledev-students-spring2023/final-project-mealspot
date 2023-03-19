import {Button} from '@mui/material';
import './GroceryListItem.css';

const buttonStyle = {
    border: 1,
    height: 30,
    marginTop: '14px',
    left: '75%'
}

function GroceryListItem({id, name, quantity}){
    return (
        <div className="groceryListItemDiv">
            <p className="groceryListItemName">{name}</p>
            <p className="groceryListItemQuantity">Quantity: {quantity}</p>
            <Button sx={buttonStyle}>Remove</Button>
        </div>
    );
}

export default GroceryListItem;