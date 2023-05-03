import {useState, useEffect, React} from 'react';
import axios from 'axios';
import {Modal, Box, Button, Typography, FormControl, TextField } from '@mui/material';
import {useStateValue} from '../StateManager.js';
import './GroceryList.css';
import GroceryListItem from './GroceryListItem';
import { useNavigate } from 'react-router-dom'

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

const GroceryList = () => {
    const [{groceryList}, dispatch] = useStateValue();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inputs, setInputs] = useState({
        id: 0,
        name: "",
        quantity: 0
    }); 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const jwtToken = localStorage.getItem("token")
    const authToken = 'jwt ' + jwtToken + ''
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/grocerylist';
    const navigate = useNavigate()

    const addToGroceryList = async () => {
        // tell StateManager to add it to the cart
        try{
            const response = await axios.post(url, {
                save: true,
                postType: 'add',
                name: inputs.name,
                quantity: inputs.quantity,
            }, {headers: { Authorization: authToken }})
            if(response.data === "noerror"){
                dispatch({
                    type: "ADD_TO_GROCERY_LIST",
                    item: {
                        id: +new Date(),
                        name: inputs.name,
                        quantity: inputs.quantity
                    }
                });
                setError(false);
            }
            else if(response.data === "error"){
                setError(true);
            }
            }
            catch(err){
                console.log(err)
            }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addToGroceryList();
        handleClose();
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const removeAll = () => {
        dispatch({
            type: "CLEAR_GROCERY_LIST"
        })
        try{
            axios.post(url, {
                save: true,
                postType: 'removeAll',
                name: inputs.name,
                quantity: inputs.quantity,
            }, {headers: { Authorization: authToken }})
            }
            catch(err){
                console.log(err)
            }
    }

    const moveAll = () => {
        try{
            dispatch({
                type: "CLEAR_GROCERY_LIST"
            })
            axios.post(url, {
                save: true,
                postType: 'moveAll',
            }, {headers: { Authorization: authToken }})

            }
            catch(err){
                console.log(err)
            }
    }

    useEffect(() => {
        if (!jwtToken) {
            console.log("user not logged in")
            navigate('/login')
        }
        async function getGroceryListIngredients(){
            try{
                const response = await axios(url, {headers: { Authorization: authToken }});
                dispatch({
                    type: "CLEAR_GROCERY_LIST"
                })
                response.data.forEach((ingredient) => {
                    if(ingredient != null){
                        dispatch({
                            type: "ADD_TO_GROCERY_LIST",
                            item: {
                                id: +new Date(), 
                                name: ingredient.ingredientName, 
                                quantity: ingredient.quantity
                            }
                        })
                    }
                })
                setIsLoading(false);
            }
            catch(err){
                console.log(err)
            }
        }
        getGroceryListIngredients()
    }, [])

    return (
        <div className="groceryListDiv">
            <h1>My Grocery List</h1>
            {isLoading ? <h3>Fetching your grocery list items...</h3> : <>
            {groceryList.length === 0 ? <h3>You currently have no items in your grocery list.</h3> : <div className="groceryListHeader"><p className="groceryListName">Item:</p><p className="groceryListQuantity">Quantity: </p></div>}
            {groceryList.map(item => (
            <GroceryListItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
            />
          ))}
           {error && <h4 className="error">There was an error adding your most recent item to the grocery list. The item may already be in the grocery list or its name is not recognizable.</h4>}
           <br/>
            <Button sx={border} variant="outlined" onClick={handleOpen}>Add Item</Button>
            {groceryList.length > 0 && <Button sx={border} variant="outlined" onClick={moveAll}>Move All Items To Fridge</Button>}
            {groceryList.length > 0 && <Button sx={border} variant="outlined" onClick={removeAll}>Remove All</Button>}
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
            </>}
        </div>
    );
}

export default GroceryList;