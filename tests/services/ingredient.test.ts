import { describe, it, expect } from 'vitest'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Ingredient } from '../../src/models/Ingredient'

describe('IngredientManager', () => {
  it('should add an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })
})

describe('IngredientManager', () => {
  it('should throw an exception when nutritionPer100Gram is missing', () => {
    const manager = new IngredientManager()

    // Mock the ingredient
    const mockIngredient = {
      name: 'Egg',
      amount: 6,
      unit: 'pcs',
      gramPerUnit: 50,
    } as unknown as Ingredient // Make it an Ingredient

    expect(() => manager.addIngredient(mockIngredient)).toThrowError(
      'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
    )
  })
})

describe('IngredientManager', () => {
  it('should not throw an exception when only calorie is added', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, { calories: 155 })
    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })
})

describe('IngredientManager', () => {
  it('should not throw an exception when only calorie is missing', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })
})
