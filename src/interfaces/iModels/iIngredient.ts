import { Unit } from '../../enums/Unit'

export interface iIngredient {
  id?: string
  name: string
  unit?: Unit // pcs, g, ml, etc.
  caloriePerHundredGram: number
  gramPerUnit?: number
  nutritionPer100Gram?: {
    proteins?: number
    fats?: number
    carbs?: number
  }
}
