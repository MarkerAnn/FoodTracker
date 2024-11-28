import { Recipe } from '../models/Recipe'

export class RecipeValidator {
  validateRecipe(recipe: Recipe): void {
    if (!recipe || typeof recipe !== 'object') {
      throw new Error('Recipe must be a valid object.')
    }
  }

  validateName(recipe: Recipe): void {
    if (!recipe.name || typeof recipe.name !== 'string') {
      throw new Error('Recipe must have a valid name as a non-empty string.')
    }
  }

  validateAmount(recipe: Recipe): void {
    if (typeof recipe.servings !== 'number' || recipe.servings <= 0) {
      throw new Error(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    }
  }

  validateInstruction(recipe: Recipe): void {
    if (!recipe.instructions || typeof recipe.instructions !== 'string') {
      throw new Error(
        'Recipe must have a valid instructions as a non-empty string.',
      )
    }
  }

  validateIngredient(recipe: Recipe): void {
    if (!recipe.ingredients || !recipe.ingredients.length) {
      throw new Error('Recipe must have at least one ingredient.')
    }
  }

  //   static validate(recipe: Recipe) {
  //     if (!recipe || typeof recipe !== 'object') {
  //       throw new Error('Recipe must be a valid object.')
  //     }

  //     if (!recipe.name || typeof recipe.name !== 'string') {
  //       throw new Error('Recipe must have a valid name as a non-empty string.')
  //     }

  //     if (typeof recipe.servings !== 'number' || recipe.servings <= 0) {
  //       throw new Error(
  //         'Recipe must have a positive amount of servings greater than 0.',
  //       )
  //     }

  //     if (!recipe.instructions || typeof recipe.instructions !== 'string') {
  //       throw new Error(
  //         'Recipe must have a valid instructions as a non-empty string.',
  //       )
  //     }

  //     if (!recipe.ingredients || !recipe.ingredients.length) {
  //       throw new Error('Recipe must have at least one ingredient.')
  //     }
  //   }
}
