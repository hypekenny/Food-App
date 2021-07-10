import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetail } from '../../actions/index';
import { Link, useHistory } from 'react-router-dom';
import altimage from "../../utils/altimage.png";





export function RecipeDetail(props) {
    
    const { getDetail } = props;
    const { id } = props.match.params; 
    
    

    useEffect(() => {
        console.log('ENTRO AL USEEFFECT');
        getDetail(id);        
    }, [])

    console.log('AAAAAA', props.recipe.diets);

    const aux = useHistory().location.pathname;

    console.log(aux); 


    return (        
        <div id={props.recipe.id}>            
            <h2>{props.recipe.title}</h2>
            <img src={props.recipe.image ? props.recipe.image : altimage} alt=''/>
            <div>
                <h4>Summary:</h4>
                <span dangerouslySetInnerHTML={{__html: props.recipe.summary}}></span>
            </div>
            <div>
                <h4>Step by step</h4>
                <p dangerouslySetInnerHTML={{__html: props.recipe.instructions}}></p>
            </div>
            <div>
                <p>Score: {props.recipe.spoonacularScore}</p>
                <p>Health Score: {props.recipe.healthScore}</p>
               {console.log('DIETAAAAA: ', props.recipe.diets)}               
               <span>Diets: { props.recipe.diets && props.recipe.diets.map((e, index) => <p key={`${props.recipe.id}-${index}`} >{e}</p>)}</span>
            </div>
            <Link to={'/home'}>
                <h5>Go back</h5>
            </Link>

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
        getDetail: id => dispatch(getDetail(id))      
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecipeDetail);