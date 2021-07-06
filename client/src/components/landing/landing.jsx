import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';


export default function Landing() {

    const [red, setRed] = useState('');
    const [flag, setflag] = useState(false);

    
   /*  function goInside() {
        setRed('/home');
        setflag(true);        
        }
        
        if(flag) {
            return <Redirect to={red} />
        }; */

    return (
        <div>
            <Link to={'/home'}>
                <h5 className='button'>Start cooking</h5>
            </Link>
        </div>
    )
}