import { iRecipe } from '../interfaces/iModels/iRecipe'
import { Ingredient } from './Ingredient'

export class Recipe implements iRecipe {
  id: string
  name: string
  ingredients: { ingredientId: string; amount: number }[]
  instructions: string
  servings: number
  nutritionPerPortion: {
    calories?: number
    proteins?: number
    fats?: number
    carbs?: number
  }

  constructor(
    name: string,
    ingredients: { ingredient: Ingredient; amount: number }[],
    instructions: string,
    servings: number,
  ) {
    if (!Array.isArray(ingredients)) {
      throw new Error('Ingredients must be an array.')
    }
    this.id = this.generateId()
    this.name = name
    this.ingredients = ingredients.map((ing) => ({
      ingredientId: ing.ingredient.id,
      amount: ing.amount,
    }))
    this.instructions = instructions
    this.servings = servings
    this.nutritionPerPortion = {}
  }

  private generateId() {
    return (
      'rec_' +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 7)
    )
  }
}
