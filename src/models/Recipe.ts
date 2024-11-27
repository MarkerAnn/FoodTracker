import { iRecipe } from '../interfaces/iModels/iRecipe'

export class Recipe implements iRecipe {
  id: string
  name: string
  ingredients: { ingredientId: string; amount: number }[]
  instructions: string
  servings: number
}
