import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import altimage from "../../utils/altimage.png";


export function ListOrdered(props) {

    return (
                 <div>
                    { !!props.recipes && props.recipes.map(e =>
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

                </div>

    )


}

function mapStateToProps(state) {
    return {
        recipes: state.recipesToShow
     };
  };

export default connect(
    mapStateToProps,
    null
  )(ListOrdered);