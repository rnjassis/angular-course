import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './../recipe.model';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
      .get<Recipe[]>(
        'https://recipes-shopping-list-9826f.firebaseio.com/recipes.json'
      );
    }), map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map( recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://recipes-shopping-list-9826f.firebaseio.com/recipes.json',
        recipesState.recipes
      );
    })
  );
}
