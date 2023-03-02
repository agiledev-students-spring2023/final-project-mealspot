import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, TextField, Grid} from '@mui/material';
import './GroceryList.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const GroceryList = () => {
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div class="groceryListDiv">
            <h1>My Grocery List</h1>
            {items.length == 0 && 
                <h3>You currently have no items in your grocery list.</h3>
            }
            <Button onClick={handleOpen}>Add Item</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Item Form
                </Typography>
                <br/>
                <FormControl>
                <TextField id="outlined-basic" label="Item Name" variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Quantity" variant="outlined" />
                <br/>
                <Button>Submit</Button>
                </FormControl>
            </Box>
            </Modal>
        </div>
    );
}

export default GroceryList;