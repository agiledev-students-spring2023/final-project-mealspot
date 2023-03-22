import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, NativeSelect, TextField, Grid} from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import RecipeDisplay from './RecipeDisplay.js';
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
    let now = new Date()
    let today = now.getDay()
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div class = "popup"> 
            <div>
                <Link to="/choosepage" className="link-edit">
                    <IconContext.Provider value={{ className: "navbar-icon" }}>
                        <div><AiFillCloseCircle /></div>
                 </IconContext.Provider>
                </Link>
            </div>
            <div className="popupInner">
                <h1>Edit Meal</h1>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Day of the Week:
                    </InputLabel>
                     <NativeSelect
                        defaultValue={today}
                        inputProps={{
                        name: 'days',
                        id: 'uncontrolled-native',
                        }}
                    >
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                        <option value={0}>Sunday</option>
                    </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Time of Day:
                    </InputLabel>
                     <NativeSelect
                        defaultValue={today}
                        inputProps={{
                        name: 'timeOfDay',
                        id: 'uncontrolled-native',
                        }}
                    >
                        <option value={1}>Morning</option>
                        <option value={2}>Afternoon</option>
                        <option value={3}>Evening</option>
                    </NativeSelect>
                </FormControl>
                <p>choose from saved</p>
                <div>
                    <RecipeDisplay apiLink='https://my.api.mockaroo.com/recipe.json?key=8198c2b0' />
                 </div>
            <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default ChooseSavedRecipes;