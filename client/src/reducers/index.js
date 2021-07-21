import { GET_RECIPES, RECIPE_DETAIL, CREATE_RECIPE, GET_DIETS, SET_SHOW, RESET_DETAIL } from "../actions/index";
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
      var array = [];      
      if(!payload.message) array = dietModifier(payload);
        return {
        ...state,
        recipes: array
      }
      case RECIPE_DETAIL: 
        let obj = payload;        
        if(!obj.message && typeof obj.diets[0] === 'object') obj = dietsArray(payload);
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
      case RESET_DETAIL: return {
        ...state,
        details: payload
      }      

      default: return state;
    }
  };
