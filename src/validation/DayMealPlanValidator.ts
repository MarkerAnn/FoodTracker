import { Meal as MealType } from '../enums/Meal'
import { RecipeManager } from '../services/RecipeManager'

export class DayMealPlanValidator {
  constructor(private recipeManager: RecipeManager) {}

  validateMealType(mealType: MealType): void {
    if (!Object.values(MealType).includes(mealType)) {
      throw new Error('Meal type is not valid.')
    }
  }

  validateRecipeId(recipeId: string): void {
    if (!recipeId || typeof recipeId !== 'string' || !recipeId.trim()) {
      throw new Error('Recipe ID must be a non-empty string.')
    }
  }

  validateRecipeExists(recipeId: string): void {
    if (
      !this.recipeManager.getRecipes().find((recipe) => recipe.id === recipeId)
    ) {
      throw new Error(`Recipe with ID ${recipeId} does not exist.`)
    }
  }

  validateDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error(
        'Date is not valid, please use the format YYYY-MM-DD, e.g. 2024-12-04',
      )
    }
  }
}
