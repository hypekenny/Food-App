import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import { createRecipe } from '../../actions/index';
import styles from './createRecipe.module.css'
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
    
      
      useEffect(() => {
        if(Object.values(errors).length === 0) {
            setDisable(false);
          } else {
            setDisable(true);
          }        
      }, [errors])
      
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

      
      function validate(input) {
        let errors = {};
        if(!input.title) errors.title = 'The recipe name is required';
        if(!input.summary) errors.summary = 'A summary is required';
        if(!input.spoonacularScore) errors.spoonacularScore = 'Give your recipe a score';
        if(!input.healthScore) errors.healthScore = 'Give your recipe a health score';
        if(!input.instructions) errors.instructions = 'You must enter a step by step';
        return errors;
      }

      useEffect(() =>{
        setState({ ...state, diets});
        console.log('HANDLE DIETS EFFECT: ', state);
        console.log('SET DIETS EFFECT: ', diets);
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
          console.log('REMOVE DIETS: ', state);
      }
      



      function handleSubmit(e) {        
        e.preventDefault();        
        props.createRecipe(state);
        console.log('ESTADO POSTEADO: ', state);
        redirect();
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
            <h2>Add your recipe</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <label>
              <b>Name </b>
            </label>
            <div className={styles.input}>
                <input 
                    name='title' 
                    className={ errors.title && styles.danger } 
                    autoFocus 
                    onChange={e => handleChange(e)} 
                    value={state.title}/>
                </div>
            <label>
              <b>Summary </b>
            </label>
            <div className={styles.summary}>
                <textarea 
                    name='summary' 
                    className={ errors.summary && styles.danger } 
                    maxLength='200' 
                    onChange={e => handleChange(e)} 
                    value={state.summary}/>
            </div>
            <label>
              <b>Score </b>
            </label>
            <div className={styles.score}>
                <input 
                    type='number' 
                    name='spoonacularScore' 
                    className={ errors.spoonacularScore && styles.danger } 
                    min="1" 
                    max="99" 
                    placeholder="1 to 99" 
                    onChange={e => handleChange(e)} 
                    value={state.spoonacularScore}/>
            </div>
            <label>
              <b>Health score </b>
            </label>
            <div className={styles.health}>         
                <input 
                    type='number' 
                    name='healthScore' 
                    className={ errors.healthScore && styles.danger } 
                    min="1" 
                    max="99" 
                    placeholder="1 to 99" 
                    onChange={e => handleChange(e)} 
                    value={state.healthScore}/>            
            </div>
            <label>
              <b>Step by step </b>
            </label>
            <div className={styles.step}>
                <textarea 
                    name='instructions' 
                    className={ errors.instructions && styles.danger } 
                    maxLength='200' 
                    onChange={e => handleChange(e)} 
                    value={state.instructions}/>
            </div>
            <div>
              <button type='submit' disabled={disable}>Add</button>
            </div>
            </form>
            <div className={styles.diets}>
            <label>
              <b>Type of diets</b>
            </label>
            </div>
            <ul>
                {diets && diets.map(d => {    
                    let i = parseInt(d);                    
                    return (<div key={arrayDiets[i]}>
                        <div>
                        <p>{arrayDiets[i]}</p>                        
                        </div>
                        <button className='close' onClick={e => removeDiet(d)} >x</button>
                        </div>
                        )
                    })
                }
            </ul>            
            <select onChange={handleDiets} name='diets'>
                <option value='x'>Diets...</option>
                <option value='1'>Gluten free</option>
                <option value='2'>Ketogenic</option>
                <option value='3'>Vegetarian</option>
                <option value='4'>Lacto ovo vegetarian</option>
                <option value='5'>Dairy free</option>
                <option value='6'>Vegan</option>   
                <option value='7'>Pescetarian</option>
                <option value='8'>Paleolithic</option>
                <option value='9'>Primal</option>
                <option value='10'>Whole30</option>
            </select>                     
        <div>         
          <Link to={'/home'} className={styles.link}>
              <h5 className={styles.backButton}>Go back</h5>
          </Link>
        </div>
    </div>
        )
}     


function mapStateToProps(state) {
    return {
        createRecipe: state.createRecipe
     };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        createRecipe: recipe => dispatch(createRecipe(recipe)),
      
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateRecipe);