import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { NativeSelect } from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './MealPlan.css';

//keep track of current money spent, will be changed by user
let currSpent = 70;

//later change <Progress done="70"/> change to 
const Progress = ({done}) => {
    let budget = `$${currSpent}/$100` //$ spent/budget
    return (
        <div className="progress">
            <div className="progress-done" style={{
                opacity: 1,
                width: `${done}%`
            }}>
            {budget}
            </div>
        </div>
    )
}

const MealPlan = () => {
    let budgetP = (currSpent/100)*100 //$ spent/budget * 100
    let now = new Date()
    let today = now.getDay()
    return (
        <>
        <h1>My Meal Plan</h1>
        <div className="progress-area">
        <p>Budget Tracker</p>
        <Progress done={budgetP.toString()}/>
        </div>
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Day of the Week
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
        <div>
        <Link to="/choosepage" className="link-edit">
            <IconContext.Provider value={{ className: "navbar-icon-edit" }}>
            <div><AiFillEdit /></div>
            </IconContext.Provider>
            Edit
        </Link>
        </div>
        </>
    );
}

export default MealPlan;