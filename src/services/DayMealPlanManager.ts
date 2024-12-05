import { RecipeManager } from './RecipeManager'

interface Meal {
  mealType: string
  recipeId: string
}

export class DayMealPlanManager {
  private meals: Meal[] = []
  constructor(private recipeManager: RecipeManager) {}

  addMeal(mealType: string, recipeId: string) {
    this.meals.push({ mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }
}
