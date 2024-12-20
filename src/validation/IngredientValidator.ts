import { Ingredient } from '../models/Ingredient'

export class IngredientValidator {
  validateIngredient(ingredient: Ingredient): void {
    if (!ingredient || typeof ingredient !== 'object') {
      throw new Error('Ingredient must be a valid object.')
    }
  }

  validateIngredientName(name: string): void {
    if (!name || typeof name !== 'string') {
      throw new Error(
        'Ingredient must have a valid name as a non-empty string.',
      )
    }
  }

  validateCalories(calories: number): void {
    if (typeof calories !== 'number' || calories <= 0) {
      throw new Error(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    }
  }

  //     if (typeof ingredient.amount !== 'number' || ingredient.amount <= 0) {
  //       throw new Error('Ingredient must have a positive amount greater than 0.')
  //     }

  //     if (!ingredient.unit || typeof ingredient.unit !== 'string') {
  //       throw new Error('Ingredient must have a valid unit as a string.')
  //     }

  //     if (
  //       typeof ingredient.gramPerUnit !== 'number' ||
  //       ingredient.gramPerUnit <= 0
  //     ) {
  //       throw new Error(
  //         'Ingredient must have gramPerUnit as a positive number greater than 0.',
  //       )
  //     }

  //     const nutrition = ingredient.nutritionPer100Gram

  //     const hasCalories =
  //       nutrition?.calories !== undefined &&
  //       typeof nutrition?.calories === 'number'
  //     const hasMacros =
  //       nutrition?.proteins !== undefined &&
  //       typeof nutrition?.proteins === 'number' &&
  //       nutrition?.fats !== undefined &&
  //       typeof nutrition?.fats === 'number' &&
  //       nutrition?.carbs !== undefined &&
  //       typeof nutrition?.carbs === 'number'

  //     if (!hasCalories && !hasMacros) {
  //       throw new Error(
  //         'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
  //       )
  //     }

  //     return true
}

// TODO: refactor this
