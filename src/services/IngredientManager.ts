import { Ingredient } from '../models/Ingredient'
import { IngredientValidator } from '../validation/IngredientValidator'

export class IngredientManager {
  private ingredients: Ingredient[] = []

  addIngredient(ingredient: Ingredient) {
    IngredientValidator.validate(ingredient)
    this.ingredients.push(ingredient)
  }
  getIngredients() {
    return this.ingredients
  }
}
