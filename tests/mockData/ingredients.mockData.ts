import { Ingredient } from '../../src/models/Ingredient'
import { Unit } from '../../src/enums/Unit'

// Mocked ingredients
export const ingredientEgg = new Ingredient('Egg', 6, Unit.PCS, 50, {
  calories: 155,
  proteins: 13,
  fats: 11,
  carbs: 1,
})

export const ingredientMilk = new Ingredient('Milk', 200, Unit.ML, 1, {
  calories: 42,
  proteins: 3.4,
  fats: 1.5,
  carbs: 4.8,
})
