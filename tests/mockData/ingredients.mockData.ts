import { Ingredient } from '../../src/models/Ingredient'
import { Unit } from '../../src/enums/Unit'

export const ingredientEgg = {
  name: 'Egg',
  caloriePerHundredGram: 155,
}

export const ingredientSkimMilk = {
  name: 'Skim Milk',
  caloriePerHundredGram: 42,
}

export const omelettEgg = {
  id: 'ing_1z4z5z',
  name: 'Egg',
  caloriePerHundredGram: 155,
}

export const omelettMilk = {
  id: 'ing_1z4z5z',
  name: 'Skim Milk',
  caloriePerHundredGram: 42,
}

export const mockNutrition = {
  egg: {
    calories: 155,
    proteins: 13,
    fats: 11,
    carbs: 1,
    gramPerUnit: 60,
    unit: Unit.PCS,
  },
  milk: {
    calories: 42,
    proteins: 3.4,
    fats: 0.1,
    carbs: 4.7,
    gramPerUnit: 100,
    unit: Unit.DL,
  },
}
