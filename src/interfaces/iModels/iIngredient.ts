export type Unit =
  | 'pcs'
  | 'g'
  | 'ml'
  | 'tbsp'
  | 'tsp'
  | 'cup'
  | 'oz'
  | 'lb'
  | 'kg'
  | 'l'
  | 'dl'
  | 'cl'
  | 'ml'

export interface iIngredient {
  id: string
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
