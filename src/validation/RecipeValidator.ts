import { Recipe } from '../models/Recipe'

export class RecipeValidator {
  static validate(recipe: Recipe) {
    if (!recipe || typeof recipe !== 'object') {
      throw new Error('Recipe must be a valid object.')
    }
  }
}
