import { Unit, iIngredient } from '../interfaces/iModels/iIngredient'

export class Ingredient implements iIngredient {
  id: string
  name: string
  amount: number
  unit: Unit
  gramPerUnit: number
  nutritionPer100Gram: {
    calories: number
    proteins: number
    fats: number
    carbs: number
  }

  constructor(
    name: string,
    amount: number,
    unit: Unit,
    gramPerUnit: number,
    nutritionPer100gram: {
      calories: number
      proteins: number
      fats: number
      carbs: number
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

// TODO: Implement error handeling, when you add ingredient you must add calories || prot, fats, carbs || everything
