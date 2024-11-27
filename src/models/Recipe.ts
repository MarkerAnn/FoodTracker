import { iRecipe } from '../interfaces/iModels/iRecipe'

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
    ingredients: { ingredientId: string; amount: number }[],
    instructions: string,
    servings: number,
  ) {
    this.id = this.generateId()
    this.name = name
    this.ingredients = ingredients
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
