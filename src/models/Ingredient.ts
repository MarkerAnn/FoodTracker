import { iIngredient } from '../interfaces/iModels/iIngredient'
import { Unit } from '../enums/Unit'

export class Ingredient implements iIngredient {
  id: string
  name: string
  caloriePerHundredGram: number
  unit?: Unit
  gramPerUnit?: number
  nutritionPer100Gram?: {
    proteins?: number
    fats?: number
    carbs?: number
  }

  constructor(name: string, caloriePerHundredGram: number) {
    this.id = this.generateId()
    this.name = name
    this.caloriePerHundredGram = caloriePerHundredGram
  }

  private generateId(): string {
    return (
      'ing_' +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 7)
    )
  }
}
