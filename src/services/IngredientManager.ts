import { Ingredient } from '../models/Ingredient'
import { IngredientValidator } from '../validation/IngredientValidator'
import { Unit } from '../enums/Unit'

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
    this.getValidatedIngredient(id)
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== id,
    )
  }

  setDtailedNutritions(
    id: string,
    nutrition: { proteins: number; fats: number; carbs: number },
  ) {
    const ingredient = this.getValidatedIngredient(id)
    ingredient.nutritionPer100Gram = nutrition
  }

  setUnitAndWeight(id: string, unit: Unit, gramPerUnit: number) {
    const ingredient = this.getValidatedIngredient(id)
    ingredient.unit = unit
    ingredient.gramPerUnit = gramPerUnit
  }

  private findIngredient(id: string) {
    return this.ingredients.find((ingredient) => ingredient.id === id)
  }

  private getValidatedIngredient(id: string) {
    const ingredient = this.findIngredient(id)
    if (!ingredient) {
      throw new Error('Ingredient does not exist.')
    }
    return ingredient
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
