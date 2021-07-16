import gif from '../../utils/404.gif';
import style from './notFound.module.css';

export default function NotFound() {

    return (

        <div className={style.spinner}>
            <h2>Sorry, page not found</h2>
            <img src={gif} alt='x'/>            
        </div>
    )
}