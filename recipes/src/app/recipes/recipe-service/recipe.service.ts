import { Injectable } from "@angular/core";
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list-service/shopping-list.service';
import { Subject } from 'rxjs/';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Test recipe','Description of a test','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg', [new Ingredient('meat',1), new Ingredient('flour', 200)]),
    new Recipe('Test recipe 2','Description of a test but now is 2','https://media.gazetadopovo.com.br/2019/11/20171835/HAMBURGUERIA-AGUA-VERDE_PE%CC%81-VERMEIO_RAFAEL_FESTIVAL-BURGER-FUNFEST_ESTU%CC%81DIO-A%CC%80-MILANESA-960x540.jpg', [new Ingredient('meat',1), new Ingredient('buns', 2), new Ingredient('bacon', 5)])
  ];

  constructor(private shoppingListService: ShoppingListService){

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
