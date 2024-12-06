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
  wheat: {
    calories: 339,
    proteins: 13.2,
    fats: 2.5,
    carbs: 68,
    gramPerUnit: 67,
    unit: Unit.DL,
  },
  butter: {
    calories: 717,
    proteins: 0.9,
    fats: 81,
    carbs: 0.1,
    gramPerUnit: 14,
    unit: Unit.TBSP,
  },
  sugar: {
    calories: 400,
    proteins: 0,
    fats: 0,
    carbs: 100,
    gramPerUnit: 15,
    unit: Unit.TBSP,
  },
  banana: {
    calories: 89,
    proteins: 1.1,
    fats: 0.3,
    carbs: 22.8,
    gramPerUnit: 118,
    unit: Unit.PCS,
  },
  oats: {
    calories: 389,
    proteins: 13.5,
    fats: 6.9,
    carbs: 67.7,
    gramPerUnit: 100,
    unit: Unit.DL,
  },
}
