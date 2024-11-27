import { RecipeValidator } from '../../src/validation/RecipeValidator'
import { Recipe } from '../../src/models/Recipe'

describe('RecipeValidator', () => {
  describe('basic validation', () => {
    it('should throw an exception if recipe is undefined', () => {
      const recipe = undefined as unknown as Recipe
      expect(() => RecipeValidator.validate(recipe)).toThrow(
        'Recipe must be a valid object.',
      )
    })
  })

  describe('name validation', () => {
    it('should throw an exception when name is empty', () => {
      const recipe = new Recipe('', [], 'Cook it', 1)
      expect(() => RecipeValidator.validate(recipe)).toThrow(
        'Recipe must have a valid name as a non-empty string.',
      )
    })
  })

  describe('amount validation', () => {
    it('should throw an exception when servings is negative', () => {
      const recipe = new Recipe('Omelette', [], 'Cook it', -1)
      expect(() => RecipeValidator.validate(recipe)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })

    it('should throw an exception when servings is zero', () => {
      const recipe = new Recipe('Omelette', [], 'Cook it', 0)
      expect(() => RecipeValidator.validate(recipe)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })
  })

  describe('instructions validation', () => {
    it('should throw an exception when instructions are missing', () => {
      const recipe = new Recipe('Omelette', [], '', 1)
      expect(() => RecipeValidator.validate(recipe)).toThrow(
        'Recipe must have a valid instructions as a non-empty string.',
      )
    })
  })



})
