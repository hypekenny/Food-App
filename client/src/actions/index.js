import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

export const GET_RECIPES = 'GET_RECIPES';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const SET_SHOW = 'SET_SHOW';
export const RESET_DETAIL = 'RESET_DETAIL';

export function getRecipes(state) {
    return (dispatch) => {
    axios.get(`/recipes?name=${state}`)
        .then(response => {
            dispatch({ type: GET_RECIPES, payload: response.data});
        })
        .catch(error => console.error(error));  
    }
};

export function getDetail(id) {    
    return (dispatch) => {
    axios.get(`/recipes/${id}`)
        .then(response => {            
            dispatch({ type: RECIPE_DETAIL, payload: response.data})
            })
            .catch(error => console.error(error));
    }
};

export function createRecipe(state) {
    return (dispatch) => {
    axios.post(`/recipes`, state)
        .then((response) => {
            MySwal.fire({
                icon: 'success',
                title: 'Your recipe was created!',
                showConfirmButton: false,
                timer: 2000
            })
            dispatch({ type: CREATE_RECIPE, payload: response.data})
            })
        .catch(error => console.error(error));        
    }
};

export function getDiets() {
    return (dispatch) => {
        axios.get(`/types`)
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
