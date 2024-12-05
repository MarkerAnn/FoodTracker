import { DayMealPlanManager } from '../../src/services/DayMealPlanManager'
import { Recipe } from '../../src/models/Recipe'
import { RecipeManager } from '../../src/services/RecipeManager'
import { setupRecipe } from '../utils/testHelpers'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Meal as MealType } from '../../src/enums/Meal'

describe('DayMealPlanManager', () => {
  let manager: DayMealPlanManager
  let recipeManager: RecipeManager
  let testRecipe: Recipe
  let ingredientManager: IngredientManager

  beforeEach(() => {
    ingredientManager = new IngredientManager()
    recipeManager = new RecipeManager()
    manager = new DayMealPlanManager(recipeManager)

    testRecipe = setupRecipe(ingredientManager)
  })

  describe('Basic Day Meal Plan Operations', () => {
    it('should add a meal to the day meal plan', () => {
      // REQ-005 - Add a meal to the day meal plan
      // REQ-006 - Connect a recipe to a meal
      manager.addMeal(MealType.Breakfast, testRecipe.id)

      const dayMealPlan = manager.getDayMealPlan()
      expect(dayMealPlan).toContainEqual(
        expect.objectContaining({
          mealType: MealType.Breakfast,
          recipeId: testRecipe.id,
        }),
      )
    })
  })
})
