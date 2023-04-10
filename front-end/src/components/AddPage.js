import {useState, React} from 'react';
import {Modal, Box, Button, Typography, FormControl, NativeSelect, TextField, Grid, autocompleteClasses} from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import './AddPage.css';

const style = {
    position: 'absolute',
    top: '64%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

const AddPage = () => {
    let now = new Date()
    let today = now.getDay()
    const [items, addItem] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/addpage`;
    return (
        <div class="addItemDiv">
            <div>
                <Link to="/choosepage" className="link-edit">
                    <IconContext.Provider value={{ className: "navbar-icon" }}>
                        <div><AiFillCloseCircle /></div>
                 </IconContext.Provider>
                </Link>
            </div>
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
                        <option value={1}>Breakfast</option>
                        <option value={2}>Lunch</option>
                        <option value={3}>Dinner</option>
                    </NativeSelect>
                </FormControl>
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