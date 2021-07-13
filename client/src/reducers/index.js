import { GET_RECIPES, RECIPE_DETAIL, CREATE_RECIPE, GET_DIETS, SET_SHOW } from "../actions/index";
import { dietsArray, dietModifier } from "../utils/functions";

const initialState = {
    recipes: [],
    recipesToShow: [],
    details: {},
    created: [],
    diets: []
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case GET_RECIPES: 
        let array = dietModifier(payload);
        return {
        ...state,
        recipes: array
      }
      case RECIPE_DETAIL: 
        let obj = payload;        
        if(typeof obj.diets[0] === 'object') obj = dietsArray(payload);        
        console.log('PAYLOAD :', obj.diets);
        return {
        ...state,
        details: obj
      }
      case CREATE_RECIPE: return {
        ...state,
        created: payload
      }
      case GET_DIETS: return {
        ...state,
        diets: payload
      }
      case SET_SHOW: return {
        ...state,
        recipes: payload
      }      
      default: return state;
    }
  };
