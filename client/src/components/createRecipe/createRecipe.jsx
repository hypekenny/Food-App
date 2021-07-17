import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import { createRecipe, getRecipes } from '../../actions/index';
import style from './createRecipe.module.css'
const { arrayDiets } = require('../../utils/constants');


export function CreateRecipe(props) {    

    const [state, setState] = useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        instructions: '',
        diets: []       
      });
      
      
      const [diets, setDiets] = useState([]);
      const [errors, setErrors] = useState({});
      const [disable, setDisable] = useState(true);
    
      ////////// Form validation //////////////////
         
      useEffect(() => {
        if(Object.values(errors).length === 0) {
            setDisable(false);
          } else {
            setDisable(true);
          }        
      }, [errors]);
      
      function handleChange(e) {
        setErrors(validate({
          ...state,
          [e.target.name]: e.target.value 
        }));
        setState({
          ...state,
          [e.target.name]: e.target.value
        });
        if(Object.values(errors).length === 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }     
      };

      function handleSubmit(e) {        
        e.preventDefault();        
        props.createRecipe(state);
        props.getRecipes('');
        redirect();
      };
      
      function validate(input) {
        let errors = {};
        if(!input.title) errors.title = 'The recipe name is required';
        if(!input.summary) errors.summary = 'A summary is required';
        if(!input.spoonacularScore) errors.spoonacularScore = 'Give your recipe a score';
        if(!input.healthScore) errors.healthScore = 'Give your recipe a health score';
        if(!input.instructions) errors.instructions = 'You must enter a step by step';
        return errors;
      }

      //////////// Diet handler ////////////////

      useEffect(() =>{
        setState({ ...state, diets});        
      }, [diets] )

      function handleDiets(e) {
        const value = e.target.value;
        if(e.target.value !== 'x' && !diets.includes(e.target.value)) {
        setDiets ([...diets, value])  
      }}      

      function removeDiet(d) {
          let array = diets;          
          let index = array.indexOf(d)          
          array.splice(index, 1);          
          setDiets([...array]);
          setState({ ...state, diets});          
      };
    

      /////////////// Redirect /////////////////////

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
        <div className={style.main}>
          <div className={style.container}>
            <h2>Add your recipe</h2>
              <form onSubmit={e => handleSubmit(e)}>
                <label>
                  <b>Name</b>
                </label>
                <div className={style.title}>
                    <input 
                        name='title'                        
                        className={`${errors.title && style.danger} ${style.input}`} 
                        autoFocus 
                        onChange={e => handleChange(e)} 
                        value={state.title}/>
                </div>                
                <label>
                  <b>Summary</b>
                </label>
                <div className={style.summary}>
                    <textarea 
                        name='summary' 
                        className={`${errors.summary && style.danger} ${style.input}`} 
                        maxLength='200' 
                        onChange={e => handleChange(e)} 
                        value={state.summary}/>
                </div>
                <label>
                  <b>Score </b>
                </label>
                <div className={style.score}>
                    <input 
                        type='number' 
                        name='spoonacularScore' 
                        className={`${errors.spoonacularScore && style.danger} ${style.input}`}  
                        min="1" 
                        max="99" 
                        placeholder="1 to 99" 
                        onChange={e => handleChange(e)} 
                        value={state.spoonacularScore}/>
                </div>
                <label>
                  <b>Health score </b>
                </label>
                <div className={style.health}>         
                    <input 
                        type='number' 
                        name='healthScore' 
                        className={`${errors.healthScore && style.danger} ${style.input}`} 
                        min="1" 
                        max="99" 
                        placeholder="1 to 99" 
                        onChange={e => handleChange(e)} 
                        value={state.healthScore}/>            
                </div>
                <label>
                  <b>Step by step </b>
                </label>
                <div className={style.step}>
                    <textarea 
                        name='instructions' 
                        className={`${errors.instructions && style.danger} ${style.input}`}  
                        maxLength='200' 
                        onChange={e => handleChange(e)} 
                        value={state.instructions}/>
                </div>
                <div className={style.buttonContainer}>
                  <button className={`${disable && style.buttonBlur} ${style.button}`} type='submit' disabled={disable}>Add</button>
                </div>
            </form>
            <div className={style.diets}>
            <label>
              <b>Type of diets</b>
            </label>
            </div>
            <div className={style.dietsContainer}>
                {diets && diets.map(d => {    
                    let i = parseInt(d);                    
                      return (<div key={arrayDiets[i]}>
                        <div>
                            <label>{arrayDiets[i]}</label>                        
                            <button className={style.close} onClick={e => removeDiet(d)} >x</button>
                        </div>
                           
                    </div>
                        )
                    })
                }
            </div>            
            <select className={style.input} onChange={handleDiets} name='diets'>
                <option value='x'>Diets...</option>
                <option value='1'>Gluten free</option>
                <option value='2'>Ketogenic</option>
                <option value='3'>Vegetarian</option>
                <option value='4'>Lacto ovo vegetarian</option>
                <option value='5'>Dairy free</option>
                <option value='6'>Vegan</option>   
                <option value='7'>Pescatarian</option>
                <option value='8'>Paleolithic</option>
                <option value='9'>Primal</option>
                <option value='10'>Whole30</option>
            </select>                             
        </div>
        <div>         
          <Link to={'/home'} className={style.link}>
              <h5 className={style.backButton}>Go back</h5>
          </Link>
        </div>
    </div>
        )
}     


  
  function mapDispatchToProps(dispatch) {
    return {
        createRecipe: recipe => dispatch(createRecipe(recipe)),
        getRecipes: recipe => dispatch(getRecipes(recipe))      
    };
  }

export default connect(
    null,
    mapDispatchToProps
  )(CreateRecipe);