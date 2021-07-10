import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getRecipes, setShow } from '../../actions/index';
import styles from './home.module.css';
import List from "../ListRecipes/listRecipes";



export function Home(props) {

    const { getRecipes, setShow, recipes, show } = props;
    const [state, setState] = useState('');
    const [sorted, setSorted] = useState(recipes);
    
    useEffect(() => {
        getRecipes('');
    }, [getRecipes])
    
    useEffect(() => {
        setShow(sorted); 
        console.log('ORDENADOS: ', sorted);                   
    }, [sorted, setSorted])
    
    function handleChange(e) {
        setState(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.getRecipes(state);                
    };

    function filterDiet(e) {
        e.preventDefault();
        let array = recipes;
        const { value } = e.target;
        if(value === 'x') props.getRecipes(state);
        array = array.filter(obj => obj.diets.includes(value));
        setSorted(array);        
    };
    
    function order(e) {
        e.preventDefault();
        let array = recipes;
        const { value } = e.target;
        console.log(value);        
        if(value === '1') array = [...array].sort((a, b) => a.title.localeCompare(b.title));
        if(value === '2') array = [...array].sort((a, b) => a.title.localeCompare(b.title)).reverse();
        if(value === '3') array = [...array].sort((a, b) => b.spoonacularScore - a.spoonacularScore);
        if(value === '4') array = [...array].sort((a, b) => b.healthScore - a.healthScore);
        setSorted(array);                
    };

        
    return (
        <div className={styles.backhome}>
            <h2>Search for recipes</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <input
                        type='text'
                        autoComplete='off'
                        value={state}
                        onChange={e => handleChange(e)}
                    />
                </div>
                    <button type='submit'>Submit</button>
            </form>
                   <div>
                        <select onChange={order} name='order'>
                            <option value='x'>Sort by...</option>
                            <option value='1'>A-Z</option>
                            <option value='2'>Z-A</option>
                            <option value='3'>Score</option>
                            <option value='4'>Health Score</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={filterDiet} name='filterDiet'>
                            <option value='x'>Select diet...</option>
                            <option value='gluten free'>Gluten free</option>
                            <option value='ketogenic'>Ketogenic</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='lacto-vegetarian'>Lacto-vegetarian</option>
                            <option value='ovo-vegetarian'>Ovo-vegetarian</option>
                            <option value='vegan'>Vegan</option>
                            <option value='pescetarian'>Pescetarian</option>
                            <option value='paleo'>Paleo</option>
                            <option value='primal'>Primal</option>
                            <option value='whole30'>Whole30</option>
                        </select>
                    </div>
                <div>
                <Link to={'/create'}>
                   <h5 className={styles.buttonhome}>Create a recipe!</h5>
                </Link>
                </div>
                <div>
                {console.log('RENDER TO SHOW: ', show)}                     
                    <List/>                     
                </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        show: state.recipesToShow
     };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getRecipes: recipe => dispatch(getRecipes(recipe)),
        setShow: recipe => dispatch(setShow(recipe))      
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);