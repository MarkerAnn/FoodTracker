import { DayMealPlanManager } from '../../src/services/DayMealPlanManager'
import { Meal } from '../../src/models/Meal'
import { Recipe } from '../../src/models/Recipe'
import { RecipeManager } from '../../src/services/RecipeManager'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Meal as MealType } from '../../src/enums/Meal'
import { setupRecipeOmelette, setupRecipePorridge } from '../utils/testHelpers'
import { DayMealPlanValidator } from '../../src/validation/DayMealPlanValidator'

// Mock validator globally
jest.mock('../../src/validation/DayMealPlanValidator', () => {
  return {
    DayMealPlanValidator: jest.fn().mockImplementation(() => ({
      validateMealType: jest.fn(),
      validateRecipeId: jest.fn(),
      validateRecipeExists: jest.fn(),
      validateDate: jest.fn(),
    })),
  }
})

// Shared variables and setup
let manager: DayMealPlanManager
let mockRecipeManager: jest.Mocked<RecipeManager>
let mockIngredientManager: jest.Mocked<IngredientManager>
let mockValidator: jest.Mocked<DayMealPlanValidator>

// Common test data
const mockDate = new Date('2024-12-04')
const mockSimpleRecipe = {
  id: 'recipe_1234',
  name: 'Test Recipe',
  ingredients: [],
  instructions: 'Test Instructions',
  servings: 1,
  generateId: jest.fn(),
} as unknown as Recipe

describe('DayMealPlanManager', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Setup IngredientManager mock
    mockIngredientManager = {
      createIngredient: jest
        .fn()
        .mockImplementation((name: string, calories: number) => ({
          id: `${name.toLowerCase()}_id`,
          name,
          calories,
          generateId: jest.fn(),
        })),
      getIngredients: jest.fn(),
      getIngredientById: jest.fn(),
      deleteIngredient: jest.fn(),
      updateIngredient: jest.fn(),
      setUnitAndWeight: jest.fn(),
      setDetailedNutritions: jest.fn(),
      getDetailedNutritions: jest.fn().mockReturnValue({
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        fiber: 0,
      }),
      getUnitAndWeight: jest.fn().mockReturnValue({
        unit: 'gram',
        gramPerUnit: 1,
      }),
    } as unknown as jest.Mocked<IngredientManager>

    // Setup RecipeManager mock
    mockRecipeManager = {
      getRecipes: jest.fn().mockReturnValue([mockSimpleRecipe]),
      getRecipeById: jest.fn().mockReturnValue(mockSimpleRecipe),
      createRecipe: jest
        .fn()
        .mockImplementation((name, ingredients, instructions, servings) => ({
          id: `${name.toLowerCase().replace(' ', '_')}_id`,
          name: name,
          ingredients,
          instructions,
          servings,
          generateId: jest.fn(),
        })),
      deleteRecipe: jest.fn(),
      updateRecipe: jest.fn(),
    } as unknown as jest.Mocked<RecipeManager>

    mockValidator = new DayMealPlanValidator(
      mockRecipeManager,
    ) as jest.Mocked<DayMealPlanValidator>

    // Create manager instance
    manager = new DayMealPlanManager(mockRecipeManager)
  })

  describe('DayMealPlanManager - Basic Operations', () => {
    describe('Meal Addition', () => {
      it('should add a meal to the day meal plan', () => {
        // REQ-005 - Add a meal to the day meal plan
        // REQ-006 - Connect a recipe to a meal
        manager.addMeal(mockDate, MealType.Breakfast, mockSimpleRecipe.id)

        const dayMealPlan = manager.getDayMealPlan()

        expect(dayMealPlan).toContainEqual(
          expect.objectContaining({
            date: mockDate,
            mealType: MealType.Breakfast,
            recipeId: mockSimpleRecipe.id,
          }),
        )
      })

      it('should create Meal instances correctly', () => {
        manager.addMeal(mockDate, MealType.Breakfast, mockSimpleRecipe.id)
        const dayMealPlan = manager.getDayMealPlan()

        expect(dayMealPlan[0]).toBeInstanceOf(Meal)
        expect(dayMealPlan[0].date).toEqual(mockDate)
        expect(dayMealPlan[0].mealType).toEqual(MealType.Breakfast)
        expect(dayMealPlan[0].recipeId).toEqual(mockSimpleRecipe.id)
      })

      it('should add multiple meals to the day plan', () => {
        // REQ-005 - Add a meal to the day meal plan
        // REQ-006 - Connect a recipe to a meal
        manager.addMeal(mockDate, MealType.Breakfast, mockSimpleRecipe.id)
        manager.addMeal(mockDate, MealType.Lunch, mockSimpleRecipe.id)

        const meals = manager.getMealsForDate(mockDate)
        expect(meals).toHaveLength(2)
        expect(meals[0].mealType).toBe(MealType.Breakfast)
        expect(meals[1].mealType).toBe(MealType.Lunch)
      })
    })
  })

  describe('DayMealPlanManager - Listing Operations', () => {
    // REQ-002 - List meals for a specific meal type
    let testRecipe1: Recipe
    let testRecipe2: Recipe
    let testDate1: Date
    let testDate2: Date

    beforeEach(() => {
      testDate1 = new Date('2024-01-01')
      testDate2 = new Date('2024-01-02')
      // Mock IngredientManager
      // Create test recipes
      testRecipe1 = mockRecipeManager.createRecipe(
        'Oatmeal Porridge',
        setupRecipePorridge(mockIngredientManager).ingredients,
        'Instructions for porridge',
        1,
      )

      testRecipe2 = mockRecipeManager.createRecipe(
        'Omelette',
        setupRecipeOmelette(mockIngredientManager).ingredients,
        'Instructions for omelette',
        1,
      )

      // Update the global mock to return the test recipes
      mockRecipeManager.getRecipeById = jest.fn().mockImplementation((id) => {
        if (id === testRecipe1.id) return testRecipe1
        if (id === testRecipe2.id) return testRecipe2
        return undefined
      })
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

    it('should throw an error when trying to delete a non-existent meal', () => {
      expect(() =>
        manager.deleteMealFromDateAndMealType(
          testDate1,
          MealType.Breakfast,
          'non-existent-recipe-id',
        ),
      ).toThrow('Meal not found')
    })
  })
})

// Get the calories for a meal and for a day
