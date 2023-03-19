import {Button} from '@mui/material';
import './FridgeItem.css';

const buttonStyle = {
    border: 1,
    height: 30,
    marginTop: '14px',
    left: '75%'
}

function FridgeItem({id, name, quantity}){
    return (
        <div className="fridgeItemDiv">
            <p className="fridgeItemName">{name}</p>
            <p className="fridgeItemQuantity">Quantity: {quantity}</p>
            <Button sx={buttonStyle}>Remove</Button>
        </div>
    );
}

export default FridgeItem;