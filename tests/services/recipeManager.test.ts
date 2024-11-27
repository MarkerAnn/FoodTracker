import { RecipeManager } from '../../src/services/RecipeManager'
import { Recipe } from '../../src/models/Recipe'
import { Ingredient } from '../../src/models/Ingredient'

describe('RecipeManager', () => {
  it('should add a recipe', () => {
    const manager = new RecipeManager()

    // Mocked ingredients
    const ingredientEgg = {
      ingredientId: '1',
      name: 'Egg',
      amount: 6,
      unit: 'pcs',
      gramPerUnit: 50,
      nutritionPer100Gram: { calories: 155, proteins: 13, fats: 11, carbs: 1 },
    }
    const ingredientMilk = {
      ingredientId: '2',
      name: 'Milk',
      amount: 200,
      unit: 'ml',
      gramPerUnit: 1,
      nutritionPer100Gram: {
        calories: 42,
        proteins: 3.4,
        fats: 1.5,
        carbs: 4.8,
      },
    }

    const instructions =
      'Whisk eggs and milk together. Pour into a hot pan and cook until set.'
    const servings = 2

    const recipe = new Recipe(
      'Omelette',
      [ingredientEgg, ingredientMilk],
      instructions,
      servings,
    )

    manager.addRecipe(recipe)
    expect(manager.getRecipes()).toContainEqual(recipe)
  })
})
