import { RecipeManager } from '../../src/services/RecipeManager'
import { Recipe } from '../../src/models/Recipe'
import { omelettMilk, omelettEgg } from '../mockData/ingredients.mockData'
import { IngredientManager } from '../../src/services/IngredientManager'

describe('RecipeManager', () => {
  let manager: RecipeManager
  let ingredientManager: IngredientManager

  beforeEach(() => {
    manager = new RecipeManager()
    ingredientManager = new IngredientManager()
  })

  describe('Add Recipe Operations', () => {
    it('should create a recipe with basic information', () => {
      // REQ-001 - Create a recipe with basic information
      const name = 'Omelette'
      const instructions =
        'Whisk eggs and milk together. Pour into a hot pan and cook until set.'
      const servings = 2
      const ingredients = [
        { ingredientId: omelettEgg.id, amount: 6 },
        { ingredientId: omelettMilk.id, amount: 2 },
      ]

      const recipe = manager.createRecipe(
        name,
        ingredients,
        instructions,
        servings,
      )

      expect(manager.getRecipes()).toContainEqual(
        expect.objectContaining({
          name,
          ingredients,
          instructions,
          servings,
        }),
      )
    })
  })

  describe('Delete Recipe Operations', () => {
    it('should delete a recipe', () => {
      // REQ-003 - Delete a recipe
      const egg = ingredientManager.createIngredient('Egg', 155)
      const recipe = manager.createRecipe(
        'Omelette',
        [{ ingredientId: egg.id, amount: 2 }],
        'Cook the eggs',
        1,
      )

      manager.deleteRecipe(recipe.id)

      expect(manager.getRecipes()).toHaveLength(0)
      expect(manager.getRecipes()).not.toContainEqual({ id: recipe.id })
    })
  })

  describe('RecipeManager - Validation', () => {
    it('should throw an error when creating recipe with empty name', () => {
      expect(() => manager.createRecipe('', [], 'Cook it', 1)).toThrow(
        'Recipe must have a valid name as a non-empty string.',
      )
    })

    it('should throw an error when creating recipe with empty instructions', () => {
      expect(() => manager.createRecipe('Omelette', [], '', 1)).toThrow(
        'Recipe must have a valid instructions as a non-empty string.',
      )
    })

    it('should throw an error when creating recipe with invalid servings', () => {
      expect(() => manager.createRecipe('Omelette', [], 'Cook it', 0)).toThrow(
        'Recipe must have a positive amount of servings greater than 0.',
      )
    })

    it('should throw an error when creating recipe with invalid ingredients', () => {
      expect(() => manager.createRecipe('Omelette', [], 'Cook it', 1)).toThrow(
        'Recipe must have at least one ingredient.',
      )
    })
  })
})
