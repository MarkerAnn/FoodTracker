import { Recipe } from '../models/Recipe'
// import { RecipeValidator } from '../validation/RecipeValidator'

export class RecipeManager {
  private recipes: Recipe[] = []

  createRecipe(
    name: string,
    ingredients: { ingredientId: string; amount: number }[],
    instructions: string,
    servings: number,
  ): Recipe {
    const recipe = new Recipe(name, ingredients, instructions, servings)
    this.recipes.push(recipe)
    return recipe
  }

  getRecipes() {
    return this.recipes
  }
}

// TODO: getNutritionPer100Gram
// TODO: getNutritionPerPortion
// TODO: updateRecipe
// TODO: deleteRecipe
