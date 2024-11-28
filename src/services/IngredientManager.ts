import { Ingredient } from '../models/Ingredient'
import { IngredientValidator } from '../validation/IngredientValidator'
import { Unit } from '../enums/Unit'
import { NutritionValues } from '../types/nutritionValues'

export class IngredientManager {
  private ingredients: Ingredient[] = []
  private validator = new IngredientValidator()
  FACTOR = 100

  createIngredient(name: string, caloriePerHundredGram: number): Ingredient {
    // Validera input
    this.validator.validateIngredientName(name)
    this.validator.validateCalories(caloriePerHundredGram)

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

  calculateCaloriesPerUnit(id: string): number {
    const ingredient = this.getValidatedIngredient(id)
    if (!ingredient.unit || !ingredient.gramPerUnit) {
      throw new Error('Unit and gramPerUnit must be defined.')
    }
    const caloriesPerUnit =
      (ingredient.caloriePerHundredGram / this.FACTOR) * ingredient.gramPerUnit
    return caloriesPerUnit
  }

  calculateDetailedNutritionPerUnit(id: string): NutritionValues {
    const ingredient = this.getValidatedIngredient(id)
    this.validateIngredientForNutrition(ingredient)

    return {
      proteins: this.calculateNutritionValue(
        ingredient.nutritionPer100Gram?.proteins,
        ingredient.gramPerUnit!,
      ),
      fats: this.calculateNutritionValue(
        ingredient.nutritionPer100Gram?.fats,
        ingredient.gramPerUnit!,
      ),
      carbs: this.calculateNutritionValue(
        ingredient.nutritionPer100Gram?.carbs,
        ingredient.gramPerUnit!,
      ),
    }
  }

  private validateIngredientForNutrition(ingredient: Ingredient): void {
    if (!ingredient.unit || !ingredient.gramPerUnit) {
      throw new Error('Unit and gramPerUnit must be defined.')
    }

    if (
      !ingredient.nutritionPer100Gram?.proteins &&
      !ingredient.nutritionPer100Gram?.fats &&
      !ingredient.nutritionPer100Gram?.carbs
    ) {
      throw new Error('Nutrition per 100 gram must be defined.')
    }
  }

  private calculateNutritionValue(
    value: number | undefined,
    gramPerUnit: number,
  ): number {
    return value !== undefined ? (value / this.FACTOR) * gramPerUnit : 0
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
}
