import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import MealPlan from './MealPlan.js';

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO MEALSPOT~~~</h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<MealPlan />} />
        </Routes>
      </Router>
    </div>
  );
}

/* future routes

          <Route path='/recipesearch' element={<RecipeSearch />} />
          <Route path='/savedrecipes' element={<SavedRecipes />} />
          <Route path='/fridge' element={<Fridge />} />
          <Route path='/grocerylist' element={<GroceryList />} />

*/

export default App;
