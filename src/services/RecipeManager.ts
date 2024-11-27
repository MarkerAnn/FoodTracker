import { Recipe } from '../models/Recipe'

export class RecipeManager {
  private recipes: Recipe[] = []

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
  }

  getRecipes() {
    return this.recipes
  }
}
