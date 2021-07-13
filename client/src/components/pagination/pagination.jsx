import { useState } from "react";
import {connect} from 'react-redux';


export function Pagination(recipes) {
    
    const [currentPage, setCurrentPage] = useState(0);
    
    
    function pagedRecipes() {
        return recipes.slice(currentPage, currentPage + 12);
    }

    function nextPage() {        
            setCurrentPage(currentPage + 12);      
    }

    function prevPage() {
        if(currentPage > 0) {
        setCurrentPage(currentPage - 12);
    }};

    function reset() {
        setCurrentPage(0);
    };

    return { pagedRecipes, nextPage, prevPage, reset, currentPage };
}


function mapStateToProps(state) {
    return {
        recipes: state.recipes,        
     };
  }


  export default connect(
    mapStateToProps,
    null
  )(Pagination);