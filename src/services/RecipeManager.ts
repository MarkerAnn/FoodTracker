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
    this.validateRecipe(recipe)
    this.recipes.push(recipe)
    return recipe
  }

  getRecipes() {
    return this.recipes
  }

  deleteRecipe(recipeId: string) {
    const recipeIndex = this.recipes.findIndex(
      (recipe) => recipe.id === recipeId,
    )
    if (recipeIndex < 0) {
      throw new Error('Recipe not found in the recipe manager.')
    }
    this.recipes.splice(recipeIndex, 1)
  }

  private validateRecipe(recipe: Recipe): void {
    this.validator.validateName(recipe)
    this.validator.validateInstruction(recipe)
    this.validator.validateAmount(recipe)
    this.validator.validateIngredient(recipe)
  }
}

// TODO: updateRecipe
