import { Injectable, OnInit } from "@angular/core";
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list-service/shopping-list.service';
import { Subject } from 'rxjs/';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[]=[];

  constructor(private shoppingListService: ShoppingListService){

  }

  setRecipes(recipe: Recipe[]){
    this.recipes=recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe:Recipe){
    this.recipes[id]=recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
