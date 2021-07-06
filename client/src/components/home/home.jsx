import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './home.css';


export default function Home(props) {

    const [state, setState] = useState('');
    const [red, setRed] = useState('');
    const [flag, setFlag] = useState(false);

        
    function handleChange(e) {
        setState(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        getRecipies(state);
    };


    function getRecipies(state) {
        return axios.get(`http://localhost:3001/recipes?name=${state}`)
            .then(recipes => console.log(recipes))            
        }
    

/*     function redirect() {
        setRed('/create');
        setFlag(true);
    };

    if(flag) return <Redirect to={red}/> */

    return (
        <div>
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
                <Link to={'/create'}>
                   <h5 className='button'>Create a recipe!</h5>
                </Link>
                </div>
        </div>
    )
}