import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import altimage from "../../utils/altimage.png";
import { useState, useEffect } from 'react';
import NotFound from '../notFound/notFound';
import style from './listRecipes.module.css';



export function List(props) {

    const [currentPage, setCurrentPage] = useState(0);
      
    useEffect(() => {
        setCurrentPage(0);
    }, [props.recipes] );
   
        function pages() {            
        return props.recipes.slice(currentPage, currentPage + 6);
        };

        function nextPage() {
            if(props.recipes.length > currentPage + 6) {
            setCurrentPage(currentPage + 6);
        }};
        
        function prevPage() {
            if(currentPage > 0) {
            setCurrentPage(currentPage - 6);
        }};
    
        
        return (
                <div>                    
                    { pages().length ? (
                    <>
                    <div>
                        <button className={style.buttonPrev} onClick={prevPage}>Prev Page</button>
                        <button className={style.buttonNext} onClick={nextPage}>Next Page</button>
                    </div>
                    <div className={style.cardcontainer}>
                         { !!pages() && pages().map(e =>
                                <div className={style.cards} key={e.id}>                                                                
                                     <div className={style.title}>
                                         <h3 className={style.h2}>{e.title}</h3>
                                     </div>  

                                <div className={style.prueba}>
                                    <div className={style.image}>
                                        <img className={style.pic} src={e.image ? e.image : altimage} alt={"no imagen"}/>
                                    </div>  

                                    <div>
                                        <h5>Diets</h5>

                                        {e.diets.length ? <div className={style.diets}>
                                        
                                        {e.diets && e.diets.map((d, index) => 
                                            <div  key={`${e.id}-${index}`} className={style.dietsul}>                                        
                                                <label className={style.listdiet}>{d}</label>  
                                            </div>
                                            )}
                                        </div> : null} 
                                    </div>                                                           
                                
                                </div>                               
                                    <Link className={style.link} to={`/recipe/${e.id}`}>                                    
                                        <p>View more</p>
                                    </Link>
                            </div>    
                                      )}
                    </div>
                                      </>) : <NotFound/>}
                </div>

    )
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes
     };
  };

 
export default connect(
    mapStateToProps,
    null
  )(List);