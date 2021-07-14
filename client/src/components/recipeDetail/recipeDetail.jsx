import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetail, resetDetail } from '../../actions/index';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../loading/loading';
import altimage from "../../utils/altimage.png";
import style from './recipeDetail.module.css';





export function RecipeDetail(props) {
    
    const { getDetail } = props;
    const { id } = props.match.params; 
    
    

    useEffect(() => {
        console.log('ENTRO AL USEEFFECT');
        props.resetDetail();
        getDetail(id);        
    }, [])

    console.log('AAAAAA', props.recipe);

    const aux = useHistory().location.pathname;

    console.log(aux); 
    console.log('FUNCIOOOOOON: ', props.recipe );


    return (        
        <div id={props.recipe.id}>
            { props.recipe.title ? (  
                <>         
            <h2>{props.recipe.title}</h2>
                <img src={props.recipe.image ? props.recipe.image : altimage} alt=''/>
            <div>
                <h4>Summary:</h4>
                     <div className={style.containerText}>
                         <span className={style.text} dangerouslySetInnerHTML={{__html: props.recipe.summary}}></span>
                    </div>
            </div>
            <div>
                <h4>Step by step</h4>
                    <div className={style.containerText}>
                        <p dangerouslySetInnerHTML={{__html: props.recipe.instructions}}></p>
                    </div>
            </div>
            <div>
                <p>Score: {props.recipe.spoonacularScore}</p>
                <p>Health Score: {props.recipe.healthScore}</p>
               {console.log('DIETAAAAA: ', props.recipe.diets)}               
               <span>Diets: { props.recipe.diets && props.recipe.diets.map((e, index) => <p key={`${props.recipe.id}-${index}`}>{e}</p>)}</span>
            </div>
            <Link to={'/home'}>
                <h5>Go back</h5>
            </Link>
             </>) : <Loading/> }
        </div>
    )
}


function mapStateToProps(state) {
    return {
        recipe: state.details
     };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getDetail: id => dispatch(getDetail(id)),
        resetDetail: x => dispatch(resetDetail(x))      
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecipeDetail);