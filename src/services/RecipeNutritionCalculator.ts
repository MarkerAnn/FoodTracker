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

  getDetailedNutritionPerPortion(recipe: Recipe) {
    const totalNutrition = recipe.ingredients.reduce((sum, ingredient) => {
      const nutritionPerUnit =
        this.ingredientManager.calculateDetailedNutritionPerUnit(
          ingredient.ingredientId,
        )
        return {
          proteins: sum.proteins + nutritionPerUnit.proteins * ingredient.amount,
          fats: sum.fats + nutritionPerUnit.fats * ingredient.amount,
          carbs: sum.carbs + nutritionPerUnit.carbs * ingredient.amount,
        }
      }, 
      { proteins: 0, fats: 0, carbs: 0 })
      return {
        proteins: totalNutrition.proteins / recipe.servings,
        fats: totalNutrition.fats / recipe.servings,
        carbs: totalNutrition.carbs / recipe.servings,
      }
  }
}
