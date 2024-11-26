import { iIngredient } from '../interfaces/iModels/iIngredient'
import { Unit } from '../enums/Unit'

export class Ingredient implements iIngredient {
  id: string
  name: string
  amount: number
  unit: Unit
  gramPerUnit: number
  nutritionPer100Gram: {
    calories?: number
    proteins?: number
    fats?: number
    carbs?: number
  }

  constructor(
    name: string,
    amount: number,
    unit: Unit,
    gramPerUnit: number,
    nutritionPer100gram: {
      calories?: number
      proteins?: number
      fats?: number
      carbs?: number
    },
  ) {
    this.id = this.generateId()
    this.name = name
    this.amount = amount
    this.unit = unit
    this.gramPerUnit = gramPerUnit
    this.nutritionPer100Gram = nutritionPer100gram
  }

  private generateId() {
    return (
      'ing_' +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 7)
    )
  }
}
