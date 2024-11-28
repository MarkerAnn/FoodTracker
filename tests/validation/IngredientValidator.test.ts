import { IngredientValidator } from '../../src/validation/IngredientValidator'
import { Ingredient } from '../../src/models/Ingredient'

describe('IngredientValidator', () => {
  let validator: IngredientValidator

  beforeEach(() => {
    validator = new IngredientValidator()
  })

  describe('basic validation', () => {
    it('should throw an exception if ingredient is undefined', () => {
      const ingredient = undefined as unknown as Ingredient
      expect(() => validator.validateIngredient(ingredient)).toThrow(
        'Ingredient must be a valid object.',
      )
    })
  })

  describe('name validation', () => {
    it('should throw an exception when name is empty', () => {
      expect(() => validator.validateIngredientName('')).toThrow(
        'Ingredient must have a valid name as a non-empty string.',
      )
    })
  })

  describe('CaloriePerHundredGram validation', () => {
    it('should throw an exception when caloriePerHundredGram is negative', () => {
      const caloriePerHundreGrame = -6
      expect(() => validator.validateCalories(caloriePerHundreGrame)).toThrow(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    })

    it('should throw an exception when caloriePerHundredGram is zero', () => {
      const caloriePerHundreGrame = 0
      expect(() => validator.validateCalories(caloriePerHundreGrame)).toThrow(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    })

    it('should throw an exception if caloriePerHundredGram is not a number', () => {
      const mockIngredient = {
        name: 'Egg',
        caloriePerHundredGram: 'six',
      } as unknown as Ingredient
      expect(() =>
        validator.validateCalories(mockIngredient.caloriePerHundredGram),
      ).toThrow(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    })
  })
})
