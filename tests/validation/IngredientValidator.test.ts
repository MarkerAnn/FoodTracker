import { IngredientValidator } from '../../src/validation/IngredientValidator'
import { Ingredient } from '../../src/models/Ingredient'

describe('IngredientValidator', () => {
  describe('basic validation', () => {
    it('should throw an exception if ingredient is undefined', () => {
      const ingredient = undefined as unknown as Ingredient
      expect(() => IngredientValidator.validate(ingredient)).toThrowError(
        'Ingredient must be a valid object.',
      )
    })
  })

  describe('name validation', () => {
    it('should throw an exception when name is empty', () => {
      const ingredient = new Ingredient('', 6, 'pcs', 50, { calories: 155 })
      expect(() => IngredientValidator.validate(ingredient)).toThrowError(
        'Ingredient must have a valid name as a non-empty string.',
      )
    })
  })

  describe('amount validation', () => {
    it('should throw an exception when amount is negative', () => {
      const ingredient = new Ingredient('Egg', -6, 'pcs', 50, { calories: 155 })
      expect(() => IngredientValidator.validate(ingredient)).toThrowError(
        'Ingredient must have a positive amount greater than 0.',
      )
    })

    it('should throw an exception when amount is zero', () => {
      const ingredient = new Ingredient('Egg', 0, 'pcs', 50, { calories: 155 })
      expect(() => IngredientValidator.validate(ingredient)).toThrowError(
        'Ingredient must have a positive amount greater than 0.',
      )
    })

    it('should throw an exception if amount is not a number', () => {
      const mockIngredient = {
        name: 'Egg',
        amount: 'six',
        unit: 'pcs',
        gramPerUnit: 50,
        nutritionPer100Gram: { calories: 155 },
      } as unknown as Ingredient
      expect(() => IngredientValidator.validate(mockIngredient)).toThrowError(
        'Ingredient must have a positive amount greater than 0.',
      )
    })
  })

  describe('unit validation', () => {
    it('should throw an exception when unit is missing', () => {
      const mockIngredient = {
        name: 'Egg',
        amount: 6,
        unit: '',
        gramPerUnit: 50,
        nutritionPer100Gram: { calories: 155 },
      } as unknown as Ingredient
      expect(() => IngredientValidator.validate(mockIngredient)).toThrowError(
        'Ingredient must have a valid unit as a string.',
      )
    })
  })

  describe('gramPerUnit validation', () => {
    it('should throw an exception when gramPerUnit is not a number', () => {
      const mockIngredient = {
        name: 'Egg',
        amount: 6,
        unit: 'pcs',
        gramPerUnit: 'fifty',
        nutritionPer100Gram: { calories: 155 },
      } as unknown as Ingredient
      expect(() => IngredientValidator.validate(mockIngredient)).toThrowError(
        'Ingredient must have gramPerUnit as a positive number greater than 0.',
      )
    })
  })

  describe('nutrition validation', () => {
    it('should throw an exception when nutritionPer100Gram is missing', () => {
      const mockIngredient = {
        name: 'Egg',
        amount: 6,
        unit: 'pcs',
        gramPerUnit: 50,
      } as unknown as Ingredient
      expect(() => IngredientValidator.validate(mockIngredient)).toThrowError(
        'Ingredient must have either calories or all macros (proteins, fats, carbs) defined.',
      )
    })

    it('should not throw an exception when only calorie is added', () => {
      const ingredient = new Ingredient('Egg', 6, 'pcs', 50, { calories: 155 })
      expect(() => IngredientValidator.validate(ingredient)).not.toThrowError()
    })
  })
})
