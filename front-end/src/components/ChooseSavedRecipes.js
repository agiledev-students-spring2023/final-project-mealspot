import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, TextField, Grid} from '@mui/material';
import './ChooseSavedRecipes.css';

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
  
const ChooseSavedRecipes = () => {
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div class = "popup"> 
            <div className="popupInner">
                <h1>Edit Meal</h1>
                <p>Day of the Week: </p>
                <p>Time of Day</p>
                <p>choose from saved</p>
            <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default ChooseSavedRecipes;