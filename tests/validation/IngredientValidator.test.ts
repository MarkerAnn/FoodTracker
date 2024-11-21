import { describe, it, expect } from 'vitest'
import { IngredientValidator } from '../../src/validation/IngredientValidator'
import { Ingredient } from '../../src/models/Ingredient'

describe('IngredientValidator', () => {
  it('should throw an exception when nutritionPer100Gram is missing', () => {
    // Mock the ingredient
    const mockIngredient = {
      name: 'Egg',
      amount: 6,
      unit: 'pcs',
      gramPerUnit: 50,
    } as unknown as Ingredient // Make it an Ingredient

    expect(() => IngredientValidator.validate(mockIngredient)).toThrowError(
      'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
    )
  })
})

describe('IngredientValidator', () => {
  it('should not throw an exception when only calorie is added', () => {
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, { calories: 155 })

    expect(() => IngredientValidator.validate(ingredient)).not.toThrowError()
  })
})

describe('IngredientValidator', () => {
  it('should not throw an exception when only calorie is missing', () => {
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    expect(() => IngredientValidator.validate(ingredient)).not.toThrowError()
  })
})

describe('IngredientValidator', () => {
  it('should throw an exception when name is empty', () => {
    const ingredient = new Ingredient('', 6, 'pcs', 50, { calories: 155 })

    expect(() => IngredientValidator.validate(ingredient)).toThrowError(
      'Ingredient must have a valid name.',
    )
  })
})

describe('IngredientValidator', () => {
  it('should throw an exception when amount is negative', () => {
    const ingredient = new Ingredient('Egg', -6, 'pcs', 50, { calories: 155 })

    expect(() => IngredientValidator.validate(ingredient)).toThrowError(
      'Ingredient must have a positive amount.',
    )
  })
})

describe('IngredientValidator', () => {
  it('should throw an exception if ingredint is undefined', () => {
    const ingredient = undefined
    expect(() => IngredientValidator.validate(undefined)).toThrowError(
      'Ingredient must be a valid  object.',
    )
  })
})
