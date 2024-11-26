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
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== id,
    )
  }
}
