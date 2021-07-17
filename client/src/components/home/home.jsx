import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getRecipes, setShow } from '../../actions/index';
import style from './home.module.css';
import List from "../ListRecipes/listRecipes";



export function Home(props) {

    const { getRecipes, setShow, recipes, show } = props;
    const [state, setState] = useState('');
    const [sorted, setSorted] = useState(recipes);
    
   
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

    ////////////////////// Diet filter //////////////////////////////

    function filterDiet(e) {
        e.preventDefault();
        let array = recipes;
        const { value } = e.target;
        if(value === 'x') props.getRecipes(state);
        array = array.filter(obj => obj.diets.includes(value));
        setSorted(array);        
    };
    
    /////////////// Sorting ////////////////////////////////////

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
        <div className={style.backHome}>
            <h1 className={style.title}>Search for recipes</h1>
            
            <form className={style.searchForm} onSubmit={e => handleSubmit(e)}>
                <div>
                    <input
                        className={style.searchBar}
                        type='text'
                        autoComplete='off'
                        value={state}
                        onChange={e => handleChange(e)}
                    />
                </div>
                    <button className={style.button} type='submit'>Submit</button>
            </form>
                   <div>
                        <select className={style.select} onChange={order} name='order'>
                            <option value='x'>Sort by...</option>
                            <option value='1'>A-Z</option>
                            <option value='2'>Z-A</option>
                            <option value='3'>Score</option>
                            <option value='4'>Health Score</option>
                        </select>
                    </div>
                    <div>
                        <select className={style.select} onChange={filterDiet} name='filterDiet'>
                            <option value='x'>Select diet...</option>
                            <option value='gluten free'>Gluten free</option>
                            <option value='ketogenic'>Ketogenic</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                            <option value='dairy free'>Dairy free</option>  
                            <option value='vegan'>Vegan</option>
                            <option value='pescatarian'>Pescatarian</option>
                            <option value='paleolithic'>Paleo</option>
                            <option value='primal'>Primal</option>
                            <option value='whole30'>Whole30</option>
                        </select>
                    </div>                
                <div>                                    
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