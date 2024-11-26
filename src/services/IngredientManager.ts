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

    if (!ingredient) {
      throw new Error('Ingredient does not exist.')
    }

    const updateIngredient = {
      ...ingredient,
      ...updateFields,
      id: ingredient.id,
    }

    IngredientValidator.validate(updateIngredient as Ingredient)

    const index = this.ingredients.findIndex((ing) => ing.id === id)
    this.ingredients[index] = updateIngredient as Ingredient
    return updateIngredient
  }
}

// TODO: implement recipemanager
