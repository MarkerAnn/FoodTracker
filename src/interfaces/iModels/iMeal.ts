import { Meal } from '../../enums/Meal'

export interface iMeal {
  date: Date
  mealType: Meal
  recipeId: string
}
