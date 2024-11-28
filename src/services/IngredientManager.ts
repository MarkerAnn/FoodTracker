import { Ingredient } from '../models/Ingredient'
import { IngredientValidator } from '../validation/IngredientValidator'
export class IngredientManager {
  private ingredients: Ingredient[] = []
  private validator = new IngredientValidator()

  createIngredient(name: string, caloriePerHundredGram: number): Ingredient {
    // Validera input
    this.validator.validateIngredientName(name)
    // this.validator.validateCalories(caloriePerHundredGram)

    const ingredient = new Ingredient(name, caloriePerHundredGram)

    this.validator.validateIngredient(ingredient)
    this.ingredients.push(ingredient)

    return ingredient
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

  // private findIngredient(id: string) {
  //   return this.ingredients.find((ingredient) => ingredient.id === id)
  // }

  //   updateIngredient(id: string, updateFields: Partial<Ingredient>) {
  //     const ingredient = this.findIngredient(id)

  //     if (!ingredient) {
  //       throw new Error('Ingredient does not exist.')
  //     }

  //     const updateIngredient = {
  //       ...ingredient,
  //       ...updateFields,
  //       id: ingredient.id,
  //     }

  //     IngredientValidator.validate(updateIngredient as Ingredient)

  //     const index = this.ingredients.findIndex((ing) => ing.id === id)
  //     this.ingredients[index] = updateIngredient as Ingredient
  //     return updateIngredient
  //   }
}
// TODO: getNutritionPer100Gram
// TODO: getNutritionPerUnit
// TODO: implement recipemanager
