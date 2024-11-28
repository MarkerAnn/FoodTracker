import { RecipeValidator } from '../../src/validation/RecipeValidator'
import { Recipe } from '../../src/models/Recipe'
import { ingredientEgg, omelettEgg } from '../mockData/ingredients.mockData'

describe('RecipeValidator', () => {
  let validator: RecipeValidator

  beforeEach(() => {
    validator = new RecipeValidator()
  })

  describe('basic validation', () => {
    it('should throw an exception if recipe is undefined', () => {
      const recipe = undefined as unknown as Recipe
      expect(() => validator.validateRecipe(recipe)).toThrow(
        'Recipe must be a valid object.',
      )
    })
  })

  it('should throw an exception if recipe is not an object (string)', () => {
    const recipe = 'not-an-object' as unknown as Recipe
    expect(() => validator.validateRecipe(recipe)).toThrow(
      'Recipe must be a valid object.',
    )
  })

  it('should throw an exception if recipe is not an object (number)', () => {
    const recipe = 42 as unknown as Recipe
    expect(() => validator.validateRecipe(recipe)).toThrow(
      'Recipe must be a valid object.',
    )
  })

  it('should not throw an exception if recipe is a valid object', () => {
    const recipe = new Recipe(
      'Omelette',
      [{ ingredientId: omelettEgg.id, amount: 6 }],
      'Cook it',
      1,
    )
    expect(() => validator.validateRecipe(recipe)).not.toThrow()
  })

  it('should throw an exception if recipe is null', () => {
    const recipe = null as unknown as Recipe
    expect(() => validator.validateRecipe(recipe)).toThrow(
      'Recipe must be a valid object.',
    )
  })

  describe('name validation', () => {
    it('should throw an exception when name is empty', () => {
      const recipe = new Recipe('', [], 'Cook it', 1)
      expect(() => validator.validateName(recipe)).toThrow(
        'Recipe must have a valid name as a non-empty string.',
      )
    })

    it('should throw an exception when name is not a string', () => {
      const recipe = new Recipe(6 as unknown as string, [], 'Cook it', 1)
      expect(() => validator.validateName(recipe)).toThrow(
        'Recipe must have a valid name as a non-empty string.',
      )
    })
  })

  describe('amount validation', () => {
    it('should throw an exception when servings is negative', () => {
      const recipe = new Recipe('Omelette', [], 'Cook it', -1)
      expect(() => validator.validateAmount(recipe)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })

    it('should throw an exception when servings is zero', () => {
      const recipe = new Recipe('Omelette', [], 'Cook it', 0)
      expect(() => validator.validateAmount(recipe)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })

    it('should throw an exception if servings is not a number', () => {
      const recipe = new Recipe(
        'Omelette',
        [],
        'Cook it',
        'six' as unknown as number,
      )
      expect(() => validator.validateAmount(recipe)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })
  })

  describe('instructions validation', () => {
    it('should throw an exception when instructions are missing', () => {
      const recipe = new Recipe('Omelette', [], '', 1)
      expect(() => validator.validateInstruction(recipe)).toThrow(
        'Recipe must have a valid instructions as a non-empty string.',
      )
    })
  })

  it('should throw an exception when instructions are not a string', () => {
    const recipe = new Recipe('Omelette', [], 6 as unknown as string, 1)
    expect(() => validator.validateInstruction(recipe)).toThrow(
      'Recipe must have a valid instructions as a non-empty string.',
    )
  })

  describe('ingredients validation', () => {
    it('should throw an exception when ingredients array is empty', () => {
      const recipe = new Recipe('Omelette', [], 'Cook it', 1)
      expect(() => validator.validateIngredient(recipe)).toThrow(
        'Recipe must have at least one ingredient.',
      )
    })
  })
})
