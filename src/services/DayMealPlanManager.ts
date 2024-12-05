import { RecipeManager } from './RecipeManager'
import { Meal as MealModel } from '../models/Meal'
import { Meal as MealType } from '../enums/Meal'

export class DayMealPlanManager {
  private meals: MealModel[] = []
  constructor(private recipeManager: RecipeManager) {}

  addMeal(mealType: MealType, recipeId: string) {
    this.validateMealType(mealType)
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
}
