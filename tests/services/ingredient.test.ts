import { describe, it, expect } from 'vitest'

import { IngredientManager } from '../../src/services/IngredientManager'

describe('IngredientManager', () => {
  it('should add an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = {
      name: 'Egg',
      amount: 6,
      unit: 'pcs',
      gramPerUnit: 50,
      nutritionPer100Gram: {
        calories: 155,
        proteins: 13,
        fats: 11,
        carbs: 1,
      },
    }

    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })
})

describe('IngredientManager', () => {
  it('should thow exception when nutritionPer100Gram is missing', () => {
    const manager = new IngredientManager()
    const ingredient = {
      name: 'Egg',
      amount: 6,
      unit: 'pcs',
      gramPerUnit: 50,
    }

    manager.addIngredient(ingredient)

    expect(() => manager.getIngredients()).toThrowError(
      'You need to add calories OR proteins, fats, carbs OR all of them',
    )
  })
})
