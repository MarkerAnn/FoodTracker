import { IngredientManager } from './IngredientManager'
import { Recipe } from '../models/Recipe'

export class RecipeNutritionCalculator {
  constructor(private ingredientManager: IngredientManager) {}

  getCaloriesPerPortion(recipe: Recipe): number {
    const totalCalories = recipe.ingredients.reduce((sum, ingredient) => {
      const caloriesPerUnit = this.ingredientManager.calculateCaloriesPerUnit(
        ingredient.ingredientId,
      )
      return sum + caloriesPerUnit * ingredient.amount
    }, 0)
    return totalCalories / recipe.servings
  }
}
