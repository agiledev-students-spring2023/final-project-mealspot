import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, TextField, Grid} from '@mui/material';
import './ChooseSavedRecipes.css';

const ChooseSavedRecipes = () => {
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div class = "popup"> 
            <div className="popupInner">
                <h1>Edit Meal</h1>
                <h2>Day of the Week: </h2>
                <h2>Time of Day</h2>
                <h3>choose from saved</h3>
            <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default ChooseSavedRecipes;