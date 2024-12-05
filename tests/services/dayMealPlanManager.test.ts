import { DayMealPlanManager } from '../../src/services/DayMealPlanManager'
import { Recipe } from '../../src/models/Recipe'
import { RecipeManager } from '../../src/services/RecipeManager'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Meal as MealType } from '../../src/enums/Meal'

describe('DayMealPlanManager', () => {
  let manager: DayMealPlanManager
  let recipeManager: RecipeManager
  let ingredientManager: IngredientManager

  beforeEach(() => {
    ingredientManager = new IngredientManager()
    recipeManager = new RecipeManager()
    manager = new DayMealPlanManager(recipeManager)
  })

  describe('Basic Day Meal Plan Operations', () => {
    it('should add a meal to the day meal plan', () => {
      // REQ-005 - Add a meal to the day meal plan
      // REQ-006 - Connect a recipe to a meal
      const egg = ingredientManager.createIngredient('Egg', 155)

      // Skapa recept direkt i RecipeManager
      const recipe = recipeManager.createRecipe(
        'Omelette',
        [{ ingredientId: egg.id, amount: 2 }],
        'Cook the eggs',
        1,
      )

      // Använd receptets ID
      manager.addMeal(MealType.Breakfast, recipe.id)

      const dayMealPlan = manager.getDayMealPlan()
      expect(dayMealPlan).toContainEqual(
        expect.objectContaining({
          mealType: MealType.Breakfast,
          recipeId: recipe.id,
        }),
      )
    })

    it('should add multiple meals to the day plan', () => {
      // Skapa recept med ingredienser
      const egg = ingredientManager.createIngredient('Egg', 155)
      const milk = ingredientManager.createIngredient('Milk', 42)
      const wheat = ingredientManager.createIngredient('Wheat', 340)

      const recipe1 = recipeManager.createRecipe(
        'Omelette',
        [
          { ingredientId: egg.id, amount: 2 },
          { ingredientId: milk.id, amount: 1 },
        ],
        'Cook it',
        1,
      )

      const recipe2 = recipeManager.createRecipe(
        'Panncakes',
        [
          { ingredientId: wheat.id, amount: 1 },
          { ingredientId: milk.id, amount: 1 },
          { ingredientId: egg.id, amount: 2 },
        ],
        'Cook it',
        1,
      )

      manager.addMeal(MealType.Breakfast, recipe1.id)
      manager.addMeal(MealType.Lunch, recipe2.id)

      const meals = manager.getDayMealPlan()
      expect(meals).toHaveLength(2)
      expect(meals[0].mealType).toBe(MealType.Breakfast)
      expect(meals[0].recipeId).toBe(recipe1.id)
      expect(meals[1].mealType).toBe(MealType.Lunch)
      expect(meals[1].recipeId).toBe(recipe2.id)
    })
  })

  describe('Day Meal Plan Validation', () => {
    it('should throw an error when adding meal with invalid meal type', () => {
      const recipeId = 'recipe_123'
      expect(() =>
        manager.addMeal('InvalidMealType' as MealType, recipeId),
      ).toThrow('Meal type is not valid.')
    })

    it('it should throw an error when adding meal with empty recipe id', () => {
      expect(() => manager.addMeal(MealType.Breakfast, '')).toThrow(
        'Recipe ID must be a non-empty string.',
      )
    })

    it('should thrwow an error when recipe cant be found', () => {
      const recipeId = 'recipe_non_existent'
      expect(() => manager.addMeal(MealType.Breakfast, recipeId)).toThrow(
        `Recipe with ID ${recipeId} does not exist.`,
      )
    })
  })
})
