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
})
