import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, TextField} from '@mui/material';
import {useStateValue} from '../StateManager.js';
import './Fridge.css';
import FridgeItem from './FridgeItem';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    textAlign: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const border = {
    border: 1.4,
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: '2vh'
}
const Fridge = () => {
    const [{myFridge}, dispatch] = useStateValue();
    const [inputs, setInputs] = useState({
        id: 0,
        name: "",
        quantity: 0
    }); 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addToFridge = () => {
        // tell StateManager to add it to the cart
        dispatch({
            type: "ADD_TO_FRIDGE",
            item: {
                id: +new Date(),
                name: inputs.name,
                quantity: inputs.quantity
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addToFridge();
        handleClose();
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="myFridgeDiv">
            <h1>My Fridge</h1>
            {myFridge.length === 0 ? <h3>You currently have no items in your fridge.</h3> : <div className="myFridgeHeader"><p className="myFridgeName">Item:</p><p className="myFridgeQuantity">Quantity: </p></div>}
            {myFridge.map(item => (
            <FridgeItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
            />
          ))}
           <br/>
            <Button sx={border} variant="outlined" onClick={handleOpen}>Add Item</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={boxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">Add Item</Typography>
                <br/>
                <form onSubmit={handleSubmit}>
                <FormControl>
                <TextField required id="outlined-basic" label="Item Name" placeholder="Enter Name" onChange={handleChange} name="name" value={inputs.name} variant="outlined" />
                <br/>
                <TextField required id="outlined-basic" label="Quantity" placeholder="Enter Quantity" onChange={handleChange} name="quantity" value={inputs.quantity} variant="outlined" />
                <br/>
                <Button sx={border} variant="outlined" type="submit">Submit</Button>
                </FormControl>
                </form>
            </Box>
            </Modal>
        </div>
    );
}

export default Fridge;