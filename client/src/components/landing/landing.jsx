import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';


export default function Landing() {  

    
    return (
        <div className={styles.back}>
            <Link to={'/home'}>
                <h5 className={styles.button}>Start cooking</h5>
            </Link>
        </div>
    )
}