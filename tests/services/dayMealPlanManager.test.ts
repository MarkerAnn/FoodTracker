import { DayMealPlanManager } from '../../src/services/DayMealPlanManager'
import { Recipe } from '../../src/models/Recipe'
import { RecipeManager } from '../../src/services/RecipeManager'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Meal as MealType } from '../../src/enums/Meal'
import { setupRecipeOmelette, setupRecipePorridge } from '../utils/testHelpers'

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

      const recipe = recipeManager.createRecipe(
        'Omelette',
        [{ ingredientId: egg.id, amount: 2 }],
        'Cook the eggs',
        1,
      )

      const date = new Date('2024-12-05')
      manager.addMeal(date, MealType.Breakfast, recipe.id)

      const dayMealPlan = manager.getDayMealPlan()
      expect(dayMealPlan).toContainEqual(
        expect.objectContaining({
          mealType: MealType.Breakfast,
          recipeId: recipe.id,
        }),
      )
    })

    it('should add multiple meals to the day plan', () => {
      // REQ-005 - Add a meal to the day meal plan
      // REQ-006 - Connect a recipe to a meal
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

      const date = new Date('2024-12-04')

      manager.addMeal(date, MealType.Breakfast, recipe1.id)
      manager.addMeal(date, MealType.Lunch, recipe2.id)

      const meals = manager.getDayMealPlan()
      expect(meals).toHaveLength(2)
      expect(meals[0].mealType).toBe(MealType.Breakfast)
      expect(meals[0].recipeId).toBe(recipe1.id)
      expect(meals[1].mealType).toBe(MealType.Lunch)
      expect(meals[1].recipeId).toBe(recipe2.id)
    })
  })

  describe('Listing Meals', () => {
    // REQ-002 - List meals for a specific meal type
    let testRecipe1: Recipe
    let testRecipe2: Recipe
    let testDate1: Date
    let testDate2: Date

    beforeEach(() => {
      const porridge = setupRecipePorridge(ingredientManager)
      testRecipe1 = recipeManager.createRecipe(
        porridge.name,
        porridge.ingredients,
        porridge.instructions,
        porridge.servings,
      )

      const omelette = setupRecipeOmelette(ingredientManager)
      testRecipe2 = recipeManager.createRecipe(
        omelette.name,
        omelette.ingredients,
        omelette.instructions,
        omelette.servings,
      )

      testDate1 = new Date('2024-12-04')
      testDate2 = new Date('2024-12-05')
    })

    it('should list meals for a specific day', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)
      manager.addMeal(testDate1, MealType.Lunch, testRecipe2.id)
      manager.addMeal(testDate2, MealType.Breakfast, testRecipe1.id)

      const mealsForDay = manager.getMealsForDate(testDate1)
      console.log(mealsForDay)

      expect(mealsForDay).toHaveLength(2)
      expect(mealsForDay).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            date: testDate1,
            mealType: MealType.Breakfast,
            recipeId: testRecipe1.id,
          }),
          expect.objectContaining({
            date: testDate1,
            mealType: MealType.Lunch,
            recipeId: testRecipe2.id,
          }),
        ]),
      )
    })

    it('should return an empty array when no meals are found for the day', () => {
      const mealsForDay = manager.getMealsForDate(testDate1)
      expect(mealsForDay).toHaveLength(0)
    })

    it('should list meals with the name of the recipe for a specific date', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe2.id)

      const mealsForDay = manager.getMealsForDate(testDate1)

      expect(mealsForDay).toEqual([
        {
          date: testDate1,
          mealType: MealType.Breakfast,
          recipeName: testRecipe1.name,
          recipeId: testRecipe1.id,
        },
        {
          date: testDate1,
          mealType: MealType.Breakfast,
          recipeName: testRecipe2.name,
          recipeId: testRecipe2.id,
        },
      ])
    })

    it('should list meals for a specific meal type', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)

      const mealsForDay = manager.getMealForDateAndMealType(
        testDate1,
        MealType.Breakfast,
      )

      expect(mealsForDay).toHaveLength(1)
      expect(mealsForDay).toEqual([
        {
          date: testDate1,
          mealType: MealType.Breakfast,
          recipeName: testRecipe1.name,
          recipeId: testRecipe1.id,
        },
      ])
      console.log(mealsForDay)
    })

    it('should list multiple meals for a specific meal type', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe2.id)

      const mealsForDay = manager.getMealForDateAndMealType(
        testDate1,
        MealType.Breakfast,
      )

      expect(mealsForDay).toHaveLength(2)
      expect(mealsForDay).toEqual([
        {
          date: testDate1,
          mealType: MealType.Breakfast,
          recipeName: testRecipe1.name,
          recipeId: testRecipe1.id,
        },
        {
          date: testDate1,
          mealType: MealType.Breakfast,
          recipeName: testRecipe2.name,
          recipeId: testRecipe2.id,
        },
      ])
      console.log(mealsForDay)
    })

    it('should delete a meal from the day meal plan', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)

      manager.deleteMealFromDateAndMealType(
        testDate1,
        MealType.Breakfast,
        testRecipe1.id,
      )

      const mealsForDay = manager.getMealForDateAndMealType(
        testDate1,
        MealType.Breakfast,
      )

      expect(mealsForDay).toHaveLength(0)
    })

    it('should delete a meal from the day meal plan when the same meal is added the same day in different meal types', () => {
      manager.addMeal(testDate1, MealType.Breakfast, testRecipe1.id)
      manager.addMeal(testDate1, MealType.Lunch, testRecipe1.id)

      manager.deleteMealFromDateAndMealType(
        testDate1,
        MealType.Breakfast,
        testRecipe1.id,
      )

      const mealsForDay = manager.getMealsForDate(testDate1)

      expect(mealsForDay).toHaveLength(1)
      expect(mealsForDay).toEqual([
        {
          date: testDate1,
          mealType: MealType.Lunch,
          recipeName: testRecipe1.name,
          recipeId: testRecipe1.id,
        },
      ])
    })
  })
})
