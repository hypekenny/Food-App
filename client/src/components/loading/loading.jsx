import spinner2 from '../../utils/spinner2.gif';
import style from './loading.module.css'


export default function Loading() {


    return (

        <div className={style.spinner}>
            <img src={spinner2} alt='x'/>
        </div>
    )
}