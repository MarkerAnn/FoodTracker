import { Recipe } from '../models/Recipe'

export class RecipeValidator {
  static validate(recipe: Recipe) {
    if (!recipe || typeof recipe !== 'object') {
      throw new Error('Recipe must be a valid object.')
    }

    if (!recipe.name || typeof recipe.name !== 'string') {
      throw new Error('Recipe must have a valid name as a non-empty string.')
    }

    if (typeof recipe.servings !== 'number' || recipe.servings <= 0) {
      throw new Error(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    }
  }
}
