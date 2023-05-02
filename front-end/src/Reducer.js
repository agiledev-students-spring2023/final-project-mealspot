export const initialState = {
    groceryList: [],
    myFridge: [],
    user: null
};

// get cart total by adding up (price * quantity) for alll the items in the car
//export const getCartTotal = (cart) =>
  //  cart?.reduce((amount, item) => item.price * item.quantity + amount, 0);

// update the cart based on the specified action
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_GROCERYLIST":
            {
                return {
                    ...state, groceryList: [...state.groceryList, action.item]
                };
            }
        case "REMOVE_FROM_GROCERYLIST":
            {
                // copy the cart to a new cart
                let newGroceryList = [...state.groceryList];

                // find the item based on id
                const index = newGroceryList.findIndex(
                    (groceryListItem) => groceryListItem.id === action.id
                );

                // if found, remove the item from the new cart
                if (index >= 0) {
                    newGroceryList.splice(index, 1);
                }

                // return the new cart
                return { ...state, groceryList: newGroceryList }
            }
        case "CLEAR_GROCERY_LIST":
            {
                return {
                    ...state, groceryList: []
                }
            }
        case "CLEAR_FRIDGE":
            {
                return {
                    ...state, myFridge: []
                };
            }
        case "ADD_TO_FRIDGE":
        {
            return {
                ...state, myFridge: [...state.myFridge, action.item]
            };
        }
        case "SET_FRIDGE":
            {
                return {
                    ...state, myFridge: action.item
                }
            }
        case "SET_GROCERY_LIST":
            {
                return {
                    ...state, myFridge: action.item
                }
            }
        case "REMOVE_FROM_FRIDGE":
            {
                // copy the cart to a new cart
                let newFridge = [...state.myFridge];

                // find the item based on id
                const index = newFridge.findIndex(
                    (fridgeItem) => fridgeItem.id === action.id
                );

                // if found, remove the item from the new cart
                if (index >= 0) {
                    newFridge.splice(index, 1);
                }

                // return the new cart
                return { ...state, myFridge: newFridge }
            }
        case "SET_USER":
            return { ...state, user: action.user }
        default:
            return state;
    }
};

export default reducer;