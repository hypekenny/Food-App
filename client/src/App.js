import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
// import RecipeCards from './components/recipeCards/cards';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import CreateRecipe from './components/createRecipe/createRecipe';
import RecipeDetail from './components/recipeDetail/recipeDetail';
import NavBar from './components/navBar/navBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">      
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={NavBar} /> 
        <Route exact path='/home' component={Home} />
        <Route path='/create' component={NavBar} />
        <Route path='/create' component={CreateRecipe} />
        <Route path='/recipe/:id' component={NavBar} />
        <Route path='/recipe/:id' component={RecipeDetail} />               
      </div>
    </BrowserRouter>
  );
}

export default App;
