import { Ingredient } from './../../shared/Ingredient.model';
import { Action, State } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5),  new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIngredient = {
        ...ingredient,
        ...action.payload
      };
      /*
      const updateIngredient = {
        ...ingredient, // old data
        ...action.payload.ingredient // new data
        // result: new data overrides old data but depending on the type of data(old has id and the new hasn't)
        // the result might have the unchanged from old data and the updated info from new data
      };
      */
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] } // copy the value instead of using the reference
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editIngredientIndex: 1
      };
    default:
      return state;
  }
}
