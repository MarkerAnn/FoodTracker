import { iIngredient } from '../interfaces/iModels/iIngredient'
import { Ingredient } from '../models/Ingredient'

export class IngredientManager {
  private ingredients: iIngredient[] = []

  addIngredient(ingredient: iIngredient) {
    this.ingredients.push(ingredient)
  }

  getIngredients() {
    return this.ingredients
  }
}
