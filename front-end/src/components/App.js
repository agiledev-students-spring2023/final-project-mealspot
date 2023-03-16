import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import MealPlan from './MealPlan.js';
import RecipeSearch from './RecipeSearch.js';
import SavedRecipes from './SavedRecipes.js';
import Fridge from './Fridge.js';
import GroceryList from './GroceryList.js';
import Account from './Account.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO MEALSPOT~~~</h1>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' exact element={<MealPlan />} />
          <Route path='/recipesearch' element={<RecipeSearch />} />
          <Route path='/savedrecipes' element={<SavedRecipes />} />
          <Route path='/fridge' element={<Fridge />} />
          <Route path='/grocerylist' element={<GroceryList />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
