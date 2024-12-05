import { Recipe } from '../models/Recipe'
import { RecipeValidator } from '../validation/RecipeValidator'

export class RecipeManager {
  private recipes: Recipe[] = []
  private validator = new RecipeValidator()

  createRecipe(
    name: string,
    ingredients: { ingredientId: string; amount: number }[],
    instructions: string,
    servings: number,
  ): Recipe {
    const recipe = new Recipe(name, ingredients, instructions, servings)
    this.validator.validateName(recipe)
    this.validator.validateInstruction(recipe)
    this.validator.validateAmount(recipe)
    this.recipes.push(recipe)
    return recipe
  }

  getRecipes() {
    return this.recipes
  }
}

// TODO: getCaloriesPerPortion
// TODO: getNutritionPerPortion
// TODO: updateRecipe
// TODO: deleteRecipe
