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
            
        return props.recipes.slice(currentPage, currentPage + 5);
        };

        function nextPage() {
            if(props.recipes.length > currentPage + 5) {
            setCurrentPage(currentPage + 5);
        }};

        
        function prevPage() {
            if(currentPage > 0) {
            setCurrentPage(currentPage - 5);
        }};
    
        
        return (
                <div>                    
                    { pages() ? (
                    <>
                    <div>
                        <button onClick={prevPage}>Prev Page</button>
                        <button onClick={nextPage}>Next Page</button>
                    </div>
                    { !!pages() && pages().map(e =>
                            <div key={e.id}>
                                <div>
                                    <img src={e.image ? e.image : altimage} alt={"no imagen"}/>
                                </div>
                                <div>
                                    <h4>{e.title}</h4>
                                </div>
                                <Link to={`/recipe/${e.id}`}>
                                    <h6>View more</h6>
                                </Link>
                                {e.diets.length ? <div>
                                    <h5>Diets</h5>
                                    {e.diets && e.diets.map((d, index) => 
                                        <ul key={`${e.id}-${index}`}>
                                            <p>{d}</p>
                                        </ul>
                                        )}
                                    </div> : null}                            

                            </div>    
                                      )}
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