import { Ingredient } from '../models/Ingredient'

export class IngredientValidator {
  static validate(ingredient: Ingredient) {
    if (!ingredient || typeof ingredient !== 'object') {
      throw new Error('Ingredient must be a valid object.')
    }

    const nutrition = ingredient.nutritionPer100Gram
    if (
      !nutrition ||
      (!nutrition.calories &&
        !(nutrition.proteins && nutrition.fats && nutrition.carbs))
    ) {
      throw new Error(
        'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
      )
    }

    if (!ingredient.name || typeof ingredient.name !== 'string') {
      throw new Error('Ingredient must have a valid name.')
    }

    if (typeof ingredient.amount !== 'number' || ingredient.amount <= 0) {
      throw new Error('Ingredient must have a positive amount.')
    }
  }
}
