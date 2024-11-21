import { iIngredient } from '../interfaces/iModels/iIngredient'
import { Ingredient } from '../models/Ingredient'

export class IngredientManager {
  private ingredients: iIngredient[] = []

  addIngredient(ingredient: iIngredient) {
    if (
      !ingredient.nutritionPer100Gram ||
      (!ingredient.nutritionPer100Gram.calories &&
        !(
          ingredient.nutritionPer100Gram.proteins &&
          ingredient.nutritionPer100Gram.fats &&
          ingredient.nutritionPer100Gram.carbs
        ))
    ) {
      throw new Error(
        'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
      )
    }
    this.ingredients.push(ingredient)
  }
  getIngredients() {
    return this.ingredients
  }
}
