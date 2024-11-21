import { Unit } from '../../enums/Unit.js'

export interface iIngredient {
  id?: string
  name: string
  amount: number
  unit: Unit // pcs, g, ml, etc.
  gramPerUnit: number
  nutritionPer100Gram: {
    calories?: number
    proteins?: number
    fats?: number
    carbs?: number
  }
}
