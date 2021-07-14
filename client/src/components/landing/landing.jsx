import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getRecipes } from '../../actions/index';
import styles from './landing.module.css';




export function Landing(props) {  

    
    return (
            <div>
                <div className={styles.back}>
                    <div className={styles.container}>
                    <Link to={'/home'} onClick={props.getRecipes('')}>
                        <h5 className={styles.button}>Start cooking</h5>
                    </Link>
                    </div>
                </div>
            </div>
        
    )
}
  
  function mapDispatchToProps(dispatch) {
    return {
        getRecipes: recipe => dispatch(getRecipes(recipe)),             
    };
  }

export default connect(
    null,
    mapDispatchToProps
  )(Landing);








