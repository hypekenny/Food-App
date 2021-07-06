import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from "axios";
import './createRecipe.css';


export default function CreateRecipe() {    

    const [state, setState] = React.useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        stepByStep: ''
      });
    
      function handleChange(e) {
        setState({
          ...state,
          [e.target.name]: e.target.value
        });
      }
     
      function handleSubmit(e) {
        e.preventDefault();
        createRecipie(state);
        redirect();        
      }     
      
      function createRecipie(state) {
        console.log(state);
        return axios.post(`http://localhost:3001/recipes`, state)
            .then(()=> alert('Your recipe was created!'));
        }
    
        const [red, setRed] = React.useState('');
        const [flag, setFlag] = React.useState(false);

        function redirect() {
            setRed('/home');
            setFlag(true);        
            }
            
            if(flag) {
                return <Redirect to={red} />
            };         
     
      return (
        <div>
          <form onSubmit={e => handleSubmit(e)}>
            <label>Name</label>
            <input name='name' autofocus required onChange={e => handleChange(e)} value={state.name}/>
            <label>Summary</label>
            <textarea name='summary' required maxlength='200' onChange={e => handleChange(e)} value={state.summary}/>
            <label>Score</label>
            <input type='number' name='score' min="1" max="10" placeholder="1 to 10" onChange={e => handleChange(e)} value={state.score}/>
            <label>Health score</label>
            <input type='number' name='healthScore' min="1" max="10" placeholder="1 to 10" onChange={e => handleChange(e)} value={state.healthScore}/>
            <label>Step by step</label>
            <textarea name='stepByStep' maxlength='200' onChange={e => handleChange(e)} value={state.setpByStep}/>
            <label>Type of diets</label>
            <input list='diets'/>
            <datalist id='diets'>
                <option value='Vegetarian'/>
                <option value='Vegan'/>
                <option value='Gluten free'/>
                <option value='Ketogenic'/>
                <option value='Lacto-vegetarian'/>
                <option value='Ovo-vegetarian'/>
                <option value='Pescetarian'/>
                <option value='Paleo'/>
                <option value='Primal'/>
                <option value='Whole30'/>
            </datalist>            
            <button type='submit'>Add</button>
          </form>        
        <Link to={'/home'}>
            <h5 className='button'>Go back</h5>
        </Link>
    </div>
        )
}