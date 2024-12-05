import { RecipeManager } from './RecipeManager'
import { Meal as MealModel } from '../models/Meal'
import { Meal as MealType } from '../enums/Meal'
import { DayMealPlanValidator } from '../validation/DayMealPlanValidator'

export class DayMealPlanManager {
  private meals: MealModel[] = []
  private validator: DayMealPlanValidator

  constructor(private recipeManager: RecipeManager) {
    this.validator = new DayMealPlanValidator(recipeManager)
  }

  addMeal(mealType: MealType, recipeId: string) {
    this.validator.validateMealType(mealType)
    this.validator.validateRecipeId(recipeId)
    this.validator.validateRecipeExists(recipeId)
    this.meals.push({ mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }
}
