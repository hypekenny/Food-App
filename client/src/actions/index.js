import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const SET_SHOW = 'SET_SHOW';
export const RESET_DETAIL = 'RESET_DETAIL';

export function getRecipes(state) {
    return (dispatch) => {
    axios.get(`http://localhost:3001/recipes?name=${state}`)
        .then(response => {
            dispatch({ type: GET_RECIPES, payload: response.data});
        })
        .catch(error => console.error(error));  
    }
};

export function getDetail(id) {    
    return (dispatch) => {
    axios.get(`http://localhost:3001/recipes/${id}`)
        .then(response => {            
            dispatch({ type: RECIPE_DETAIL, payload: response.data})
            })
            .catch(error => console.error(error));
    }
};

export function createRecipe(state) {
    return (dispatch) => {
    axios.post(`http://localhost:3001/recipes`, state)
        .then((response) => {
            alert('Your recipe was created!');
            dispatch({ type: CREATE_RECIPE, payload: response.data})
            })
        .catch(error => console.error(error));        
    }
};

export function getDiets() {
    return (dispatch) => {
        axios.get(`http://localhost:3001/types`)
            .then(response => {
                dispatch({ type: GET_DIETS, payload: response.data})
            })
            .catch(error => console.error(error));
    }
};

export function setShow(show) {
    return (dispatch) => {
        dispatch({ type: SET_SHOW, payload: show})
    }
};

export function resetDetail() {
    return (dispatch) => {
        dispatch({ type: RESET_DETAIL, payload: {} })
    }
}
