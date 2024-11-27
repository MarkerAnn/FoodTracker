export interface iRecipe {
  id: string
  name: string
  ingredients: {
    ingredientId: string
    amount: number
  }[]
  instructions: string
  servings: number
}
