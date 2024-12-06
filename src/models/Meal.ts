import { iMeal } from '../interfaces/iModels/iMeal'
import { Meal as MealEnum } from '../enums/Meal'

export class Meal implements iMeal {
  constructor(
    public date: Date,
    public mealType: MealEnum,
    public recipeId: string,
  ) {}
}
