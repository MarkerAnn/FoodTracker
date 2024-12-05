import { IngredientManager } from './IngredientManager'
import { Recipe } from '../models/Recipe'

export class RecipeNutritionCalculator {
  constructor(private ingredientManager: IngredientManager) {}

  getCaloriesPerPortion(recipe: Recipe): number {
    const totalCalories = recipe.ingredients.reduce((sum, ingredient) => {
      const caloriesPerUnit = this.ingredientManager.calculateCaloriesPerUnit(
        ingredient.ingredientId,
      )
      console.log('caloriesPerUnit', caloriesPerUnit)
      console.log('ingredient.amount', ingredient.amount)
      return sum + caloriesPerUnit * ingredient.amount
    }, 0)
    console.log('totalCalories', totalCalories)

    return totalCalories / recipe.servings
  }
}
