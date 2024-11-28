import { RecipeManager } from '../../src/services/RecipeManager'
import { Recipe } from '../../src/models/Recipe'
import { omelettMilk, omelettEgg } from '../mockData/ingredients.mockData'

describe('RecipeManager', () => {
  let manager: RecipeManager

  beforeEach(() => {
    manager = new RecipeManager()
  })

  describe('Basic Recipe Operations', () => {
    it('should create a recipe with basic information', () => {
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
})
