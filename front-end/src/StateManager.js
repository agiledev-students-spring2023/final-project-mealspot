import { createContext, useContext, useReducer } from "react";

// create the state context
export const StateContext = createContext();

// StateManager manages the shopping cart and the user state for the whole application
export const StateManager = ({ reducer, initialState, children }) =>
(<StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
</StateContext.Provider>);

// pull state from the context
export const useStateValue = () => useContext(StateContext);