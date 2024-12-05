import { DayMealPlanManager } from '../../src/services/dayMealPlanManager'
import { Recipe } from '../../src/models/Recipe'
import { RecipeManager } from '../../src/services/RecipeManager'

describe('DayMealPlanManager', () => {
  let manager: DayMealPlanManager
  let recipeManager: RecipeManager
  let testRecipe: Recipe

  beforeEach(() => {
    recipeManager = new RecipeManager()
    manager = new DayMealPlanManager(recipeManager)
    testRecipe = recipeManager.createRecipe('Omelette', [], 'Cook it', 1)
  })

  describe('Basic Day Meal Plan Operations', () => {
    it('should add a meal to the day meal plan', () => {
      // REQ-005 - Add a meal to the day meal plan
      // REQ-006 - Connect a recipe to a meal
      const mealType = 'Breakfast'
      manager.addMeal(mealType, testRecipe.id)

      const dayMealPlan = manager.getDayMealPlan()
      expect(dayMealPlan).toContainEqual(
        expect.objectContaining({
          mealType,
          recipeId: testRecipe.id,
        }),
      )
    })
  })
})
