import { RecipeManager } from './RecipeManager'
import { Meal as MealModel } from '../models/Meal'
import { Meal as MealType } from '../enums/Meal'

export class DayMealPlanManager {
  private meals: MealModel[] = []
  constructor(private recipeManager: RecipeManager) {}

  addMeal(mealType: MealType, recipeId: string) {
    const meal = new MealModel(mealType, recipeId)
    this.meals.push({ mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }
}
