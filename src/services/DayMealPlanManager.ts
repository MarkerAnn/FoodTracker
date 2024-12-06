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

  addMeal(date: Date, mealType: MealType, recipeId: string) {
    this.validator.validateMealType(mealType)
    this.validator.validateRecipeId(recipeId)
    this.validator.validateRecipeExists(recipeId)
    this.validator.validateDate(date)

    this.meals.push({ date, mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }
}

// TODO: Add date to day meal plan REQ-005
// TODO: removeMeal
// TODO: listMeals for a specific meal type REQ-002
// TODO: List meals for the day
// TODO: getCaloriesForDay REQ-007 REQ-019
