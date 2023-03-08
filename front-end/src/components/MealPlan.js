import React from 'react';
import './MealPlan.css';

//later change <Progress done="70"/> change to 
const Progress = ({done}) => {
    let budget = "$70/$100" //$ spent/budget
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
    let budgetP = (70/100)*100 //$ spent/budget * 100
    return (
        <>
        <h1>Meal Plan Page</h1>
        <div className="progress-area">
        <p>Budget Tracker</p>
        <Progress done={budgetP.toString()}/>
        </div>
        </>
    );
}

export default MealPlan;