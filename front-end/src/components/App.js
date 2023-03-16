import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import MealPlan from './MealPlan.js';
import RecipeSearch from './RecipeSearch.js';
import SavedRecipes from './SavedRecipes.js';
import Fridge from './Fridge.js';
import GroceryList from './GroceryList.js';

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO MEALSPOT~~~</h1>
      <Router>
        <Routes>
          <Route path='/' exact element={<MealPlan />} />
          <Route path='/recipesearch' element={<RecipeSearch />} />
          <Route path='/savedrecipes' element={<SavedRecipes />} />
          <Route path='/fridge' element={<Fridge />} />
          <Route path='/grocerylist' element={<GroceryList />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
