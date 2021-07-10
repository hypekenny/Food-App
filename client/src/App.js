import './App.css';
import { Route } from 'react-router-dom';
// import RecipeCards from './components/recipeCards/cards';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import CreateRecipe from './components/createRecipe/createRecipe';
import RecipeDetail from './components/recipeDetail/recipeDetail';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/create' component={CreateRecipe} />
      <Route path='/recipe/:id' component={RecipeDetail} />
    </div>
  );
}

export default App;
