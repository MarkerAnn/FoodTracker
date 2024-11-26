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
    if (this.findIngredient(id)) {
      this.ingredients = this.ingredients.filter(
        (ingredient) => ingredient.id !== id,
      )
    } else {
      throw new Error('Ingredient does not exist.')
    }
  }

  private findIngredient(id: string) {
    return this.ingredients.find((ingredient) => ingredient.id === id)
  }

  updateIngredient(id: string, updateFields: Partial<Ingredient>) {
    const ingredient = this.findIngredient(id)
    const updateIngredient = {
      ...ingredient,
      ...updateFields,
      id: ingredient.id,
    }

    const index = this.ingredients.findIndex((ing) => ing.id === id)
    this.ingredients[index] = updateIngredient as Ingredient
    return updateIngredient
  }
}
