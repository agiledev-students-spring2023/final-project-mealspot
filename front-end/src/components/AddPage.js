import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, TextField, Grid} from '@mui/material';
import './AddPage.css';

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

const AddPage = () => {
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div class="addItemDiv">
            <h1>Edit Meal</h1>
            <p>Day of the Week: </p>
            <p>Time of Day</p>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Add My Own
                </Typography>
                <br/>
                <FormControl>
                <TextField id="outlined-basic" label="Enter Name..." variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Enter Price..." variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Enter Ingredients..." variant="outlined" />
                <br/>
                <TextField id="outlined-basic" label="Placeholder Image" variant="outlined" />
                <br/>
                <Button id = "uploadImg">Upload Image</Button>
                <Button id = "save">Save Meal</Button>
                </FormControl>
            </Box>
        </div>
    );
}

export default AddPage;