import { Recipe } from './../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActionType) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }; // newRecipe overrides state.recipes[...]
      const updatedRecipesList = [...state.recipes];
      updatedRecipesList[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipesList
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
