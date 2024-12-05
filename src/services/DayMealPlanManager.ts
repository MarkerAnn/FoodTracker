import { RecipeManager } from './RecipeManager'
import { Meal as MealModel } from '../models/Meal'
import { Meal as MealType } from '../enums/Meal'

export class DayMealPlanManager {
  private meals: MealModel[] = []
  constructor(private recipeManager: RecipeManager) {}

  addMeal(mealType: MealType, recipeId: string) {
    this.validateMealType(mealType)
    this.validateRecipeId(recipeId)
    this.validateRecipeExists(recipeId)
    this.meals.push({ mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }

  private validateMealType(mealType: MealType): void {
    if (!Object.values(MealType).includes(mealType)) {
      throw new Error('Meal type is not valid.')
    }
  }

  private validateRecipeId(recipeId: string): void {
    if (!recipeId || typeof recipeId !== 'string' || !recipeId.trim()) {
      throw new Error('Recipe ID must be a non-empty string.')
    }
  }

  private validateRecipeExists(recipeId: string): void {
    if (
      !this.recipeManager.getRecipes().find((recipe) => recipe.id === recipeId)
    ) {
      throw new Error(`Recipe with ID ${recipeId} does not exist.`)
    }
  }
}
