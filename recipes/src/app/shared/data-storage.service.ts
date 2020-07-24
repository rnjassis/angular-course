import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe-service/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipes-shopping-list-9826f.firebaseio.com/recipes.json',
        recipes
      )

      .subscribe((response) => {
        console.log('stored');
      });
  }

  fetchRecipes() {
    // exhaustMap: wait for the first observable to complete (take(1)), then returns another observable
    return this.http
      .get<Recipe[]>(
        'https://recipes-shopping-list-9826f.firebaseio.com/recipes.json'
      ).pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => this.recipeService.setRecipes(recipes))
        );
  }
}
