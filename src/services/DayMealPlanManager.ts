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
    this.validateMeal(date, mealType, recipeId)

    this.meals.push({ date, mealType, recipeId })
  }

  getDayMealPlan() {
    return this.meals
  }

  getMealsForDate(date: Date) {
    const recipes = this.meals.filter(
      (meal) => meal.date.toDateString() === date.toDateString(),
    )

    return recipes.map((meal) => {
      const recipeData = this.getRecipeData(meal.recipeId)

      return {
        date: meal.date,
        mealType: meal.mealType,
        recipeId: meal.recipeId,
        recipeName: recipeData?.name,
      }
    })
  }

  getMealForDateAndMealType(date: Date, mealType: MealType) {
    const recipes = this.meals.filter(
      (meal) =>
        meal.date.toDateString() === date.toDateString() &&
        meal.mealType === mealType,
    )

    return recipes.map((meal) => {
      const recipeData = this.getRecipeData(meal.recipeId)

      return {
        date: meal.date,
        mealType: meal.mealType,
        recipeId: meal.recipeId,
        recipeName: recipeData?.name,
      }
    })
  }

  private getRecipeData(recipeId: string) {
    return this.recipeManager
      .getRecipes()
      .find((recipe) => recipe.id === recipeId)
  }

  private validateMeal(date: Date, mealType: MealType, recipeId: string) {
    this.validator.validateMealType(mealType)
    this.validator.validateRecipeId(recipeId)
    this.validator.validateRecipeExists(recipeId)
    this.validator.validateDate(date)
  }
}

// TODO: remove Recipe from meal
// TODO: getCaloriesForDay REQ-007 REQ-019
