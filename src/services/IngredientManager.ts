import { Ingredient } from '../models/Ingredient.js'
import { IngredientValidator } from '../validation/IngredientValidator.js'

export class IngredientManager {
  private ingredients: Ingredient[] = []

  addIngredient(ingredient: Ingredient) {
    IngredientValidator.validate(ingredient)
    this.ingredients.push(ingredient)
  }
  getIngredients() {
    return this.ingredients
  }

  deleteIngredient(id: string) {
    if (!this.ingredients.some((ingredient) => ingredient.id === id)) {
      throw new Error('Ingredient does not exist.')
    }
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== id,
    )
  }
}
